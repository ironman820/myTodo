from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview.as_view(), name='api-overview')
]