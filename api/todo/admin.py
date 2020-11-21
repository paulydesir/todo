from django.contrib import admin
from .models import Goal,Task,Reflection,Theme

# Register your models here.
admin.site.register(Goal)
admin.site.register(Task)
admin.site.register(Reflection)
admin.site.register(Theme)

