from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions

import csv
import os

BASE_PATH = "./files"

@api_view(['GET', 'DELETE', 'PUT', 'POST'])
def upload_file(request):
    uploaded_filename = request.FILES['file'].name
    try:
        os.mkdir(os.path.join(BASE_PATH))
    except:
        pass
    full_filename = os.path.join(BASE_PATH, uploaded_filename)
    fout = open(full_filename, 'wb+')
    file_data = request.FILES['file']
    for chunk in file_data.chunks():
        fout.write(chunk)
    fout.close()
    return Response(status=200, data={"sucess"})

@api_view(['GET'])
def all_files(request):
    try:
        os.mkdir(os.path.join(BASE_PATH))
    except:
        pass
    file_list = os.listdir(BASE_PATH)
    return Response(status=200, data=file_list)
