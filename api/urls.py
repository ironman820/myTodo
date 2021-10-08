from django.urls import path
from . import views

urlpatterns = [
    # path('tasks/create/', views.taskCreate, name='task-create'),
    path('tasks/<str:pk>/', views.taskDetail.as_view(), name='task-detail'),
    path('tasks/', views.taskList.as_view(), name='task-list'),
    path('', views.apiOverview.as_view(), name='api-overview'),
]