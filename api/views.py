# from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import ListView
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Task
from .serializers import TaskSerializer

# Create your views here.
class apiOverview(APIView):
    name = 'API Overview'
    description = 'List of API functions available from this server.'

    def get(self, request, format=None):
        api_urls = {
            'List': '/task-list/',
            'Detail View': '/task-detail/<str:pk>/',
            'Create': '/task-create/',
            'Update': '/task-update/<str:pk>/',
            'Delete': '/task-delete/<str:pk>/',
        }

        return Response(api_urls)

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer  = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
    tasks = Task.objects.get(pk=pk)
    serializer  = TaskSerializer(tasks, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
    serializer  = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer  = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Item Deleted')