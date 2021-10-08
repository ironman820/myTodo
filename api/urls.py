from django.urls import path
from . import views

urlpatterns = [
    path('task-create/', views.taskCreate, name='task-create'),
    path('task-delete/<str:pk>/', views.taskDelete, name='task-delete'),
    path('task-detail/<str:pk>/', views.taskDetail, name='task-detail'),
    path('task-list/', views.taskList, name='task-list'),
    path('task-update/<str:pk>/', views.taskUpdate, name='task-update'),
    path('', views.apiOverview.as_view(), name='api-overview')
]