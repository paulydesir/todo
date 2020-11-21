from rest_framework import serializers
from .models import Goal,Task,Reflection,Theme
from rest_framework_bulk.drf3.serializers import BulkSerializerMixin, BulkListSerializer
from taggit_serializer.serializers import TagListSerializerField,TaggitSerializer

class GoalSerializer (BulkSerializerMixin,serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'
        list_serializer_class = BulkListSerializer

class TaskSerializer (TaggitSerializer,BulkSerializerMixin,serializers.ModelSerializer):
    tags = TagListSerializerField()
    get_children = serializers.ReadOnlyField()    
    class Meta:
        model = Task
        # fields = '__all__'
        fields = ['id','title','goal','completed','parent','tags','get_children']
        list_serializer_class = BulkListSerializer

class ReflectionSerializer (serializers.ModelSerializer):
    class Meta:
        model = Reflection
        fields = '__all__'

class ThemeSerializer (serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'