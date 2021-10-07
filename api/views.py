# from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class apiOverview(APIView):
    name = 'API Overview'
    description = 'List of API functions available from this server.'

    def get(self, request, format=None):
        return Response("API BASE POINT")