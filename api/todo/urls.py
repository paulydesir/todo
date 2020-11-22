from django.urls import path, include,re_path
from rest_framework.routers import DefaultRouter
from todo.views import ReflectionViewSet,GoalBulkViewSet,TaskBulkViewSet,ThemeViewSet,TaskFilterList
from rest_framework_bulk.routes import BulkRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
b_router = BulkRouter()

b_router.register('goals', GoalBulkViewSet)
b_router.register('tasks',TaskBulkViewSet)


# router.register('goals', GoalViewSet)
router.register('reflections', ReflectionViewSet)
router.register('themes',ThemeViewSet)
# router.register('actions', ActionViewSet)
# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('',include(b_router.urls)),
    # path('goals/children/<id>/', GoalChildrendetail.as_view({'get':'list'}), name='goalChildren_detail'),
    re_path('^filters/tasks/parents/', TaskFilterList.as_view()),

]