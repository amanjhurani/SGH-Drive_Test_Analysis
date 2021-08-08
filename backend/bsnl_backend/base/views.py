from django.shortcuts import render
from numpy.core.numeric import NaN

# Create your views here.
from rest_framework import viewsets

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions

import csv
import os
import pandas as pd
import math as math

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

@api_view(['GET', 'POST'])
def display_rscp(request):

    file_name = request.data.get('file_name')
    data_file = os.path.join(BASE_PATH, file_name)
    rscp_df = pd.read_csv(data_file)
    rscp_json = []

    for time, lat, long, rscp in zip(rscp_df['Time'].to_list(), rscp_df['Latitude'].to_list(), rscp_df['Longitude'].to_list(), rscp_df['Active RSCP (dBm)(0)'].to_list(), ):
        tmp = dict()
        tmp["time_stamp"] = time
        tmp["coordinate"] = [lat, long]
        tmp["active_rscp"] = rscp

        rscp_json.append(tmp)

    return Response(status=200, data=rscp_json)

@api_view(['GET', 'POST'])
def display_rxtx(request):

    file_name = request.data.get('file_name')
    data_file = os.path.join(BASE_PATH, file_name)
    rxtx_df = pd.read_csv(data_file)
    rxtx_json = []

    for time, lat, long, rx_power, tx_power in zip(rxtx_df['Time'].to_list(), rxtx_df['Latitude'].to_list(), rxtx_df['Longitude'].to_list(), rxtx_df['Rx Power (dBm)'].to_list(), rxtx_df['Tx Power (dBm)'].to_list()):
        if  math.isnan(tx_power):
            tx_power = None
            
        tmp = dict()
        tmp["time_stamp"] = time
        tmp["coordinate"] = [lat, long]
        tmp["rxtx_power"] = [rx_power, tx_power]

        rxtx_json.append(tmp)

    return Response(status=200, data=rxtx_json)


@api_view(['GET', 'POST'])
def display_eclo(request):

    file_name = request.data.get('file_name')
    data_file = os.path.join(BASE_PATH, file_name)
    eclo_df = pd.read_csv(data_file)
    eclo_json = []

    for time, lat, long, eclo in zip(eclo_df['Time'].to_list(), eclo_df['Latitude'].to_list(), eclo_df['Longitude'].to_list(), eclo_df['Total Agg EcIo (dB)'].to_list(), ):
        tmp = dict()
        tmp["time_stamp"] = time
        tmp["coordinate"] = [lat, long]
        tmp["active_eclo"] = eclo

        eclo_json.append(tmp)

    return Response(status=200, data=eclo_json)

@api_view(['GET', 'POST'])
def display_rssi(request):

    file_name = request.data.get('file_name')
    data_file = os.path.join(BASE_PATH, file_name)
    rssi_df = pd.read_csv(data_file)
    rssi_json = []

    for time, lat, long, rscp, eclo in zip(rssi_df['Time'].to_list(), rssi_df['Latitude'].to_list(), rssi_df['Longitude'].to_list(), rssi_df['Active RSCP (dBm)(0)'].to_list(), rssi_df['Total Agg EcIo (dB)'].to_list(),):
        tmp = dict()
        tmp["time_stamp"] = time
        tmp["coordinate"] = [lat, long]
        tmp["active_rssi"] = round(rscp-eclo,2)

        rssi_json.append(tmp)

    return Response(status=200, data=rssi_json)