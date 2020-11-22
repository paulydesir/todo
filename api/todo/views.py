from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GoalSerializer,TaskSerializer,ReflectionSerializer,ThemeSerializer
from .models import  Goal,Task,Reflection,Theme
# from rest_framework.response import Response
from rest_framework_bulk import ListBulkCreateUpdateDestroyAPIView,BulkModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
# import django_filters
from rest_framework import generics


class GoalBulkViewSet(BulkModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

# class TaskFilter(django_filters.FilterSet):
#     class Meta:
#         model = Action
#         fields = {
#             'datecreated': ['range'],
#             'repeats':['exact'],
#             'difficulty':['exact'],
#             'goal':['exact']
#         }


class TaskBulkViewSet(BulkModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['parent', 'goal']

class TaskFilterList(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        # username = self.kwargs['id']
        return Task.objects.filter(parent__isnull=True)


class ReflectionViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ReflectionSerializer
    queryset = Reflection.objects.all()

class ThemeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()