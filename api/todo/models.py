from django.db import models
from taggit.managers import TaggableManager
# Create your models here.

class Theme(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank = True,null=True)

    def __str__(self):
        return self.title


class Goal(models.Model):
    priorities = (
        ("1","Problem"),
        ("2","Essential"),
        ("3","High"),
        ("4","Preferable"),
        ("5","Desirable")
    )
    #owner = models.ForeignKey()
    title = models.CharField(max_length=250)
    # parent_goal = models.ForeignKey( "self", related_name="children", null=True, blank=True, on_delete=models.SET_NULL)
    priority = models.CharField(choices=priorities,max_length=1,default="3")
    # timeblock = models.ForeignKey(Timeblock, null=True, blank=True, on_delete=models.SET_NULL,related_name='timeblock')
    deadline = models.DateTimeField(blank = True,null=True)
    pinned = models.BooleanField(default=False)
    themes = models.ManyToManyField(Theme, blank = True)
    # description = models.TextField(blank = True,null=True)
    
    def __str__(self):
        return self.title


   
class Task(models.Model):
    title = models.CharField(max_length= 250)
    goal = models.ForeignKey(Goal, related_name='task',null=True, blank=True, on_delete=models.SET_NULL)
    completed = models.BooleanField(default=False)
    tags = TaggableManager()
    parent = models.ForeignKey('self',related_name='children',blank = True, null = True, on_delete=models.CASCADE)
    #date history required for some sort of overdue tracking.

    def __str__(self):
        return self.title

    def get_children(self):
        children = list()
        children.append(self.id)
        for child in self.children.all():
            children.extend(child.get_children())
        return children
    
class Reflection(models.Model):
    title = models.CharField(max_length=100)
    goals = models.ManyToManyField(Goal)
    text = models.TextField()
    datecreated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

