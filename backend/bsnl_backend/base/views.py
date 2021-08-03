from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions

@api_view(['GET', 'DELETE', 'PUT'])
def get_data(request):
   return Response(status=200, data={"Hi it's working! Please"})