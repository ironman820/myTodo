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
        host = 'http://' + request.get_host() + '/api/'
        api_urls = {
            'List': host + 'tasks/',
            'Indivitual tasks': host + 'tasks/<str:pk>/',
            'Create': host + 'tasks/',
        }

        return Response(api_urls)

class taskList(APIView):
    name = 'Task List'
    description = 'Returns a list of all tasks. Post to this page to create a new task.'

    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer  = TaskSerializer(tasks, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer  = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class taskDetail(APIView):
    name = 'Task Detail'
    description = 'View, update, or delete a specific task.'
    
    def get(self, request, pk, format=None):
        tasks = Task.objects.get(pk=pk)
        serializer  = TaskSerializer(tasks, many=False, context={'request':request})
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        task = Task.objects.get(pk=pk)
        serializer  = TaskSerializer(instance=task, data=request.data, context={'request':request})

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        task = Task.objects.get(pk=pk)
        task.delete()
        return Response('Item Deleted')
