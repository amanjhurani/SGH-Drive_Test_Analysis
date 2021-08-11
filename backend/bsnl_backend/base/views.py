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
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from sklearn.cluster import Birch
from numpy import unique, where

import pandas as pd
import numpy as np
import os
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
    print(full_filename)
    fout = open(full_filename, 'wb+')
    file_data = request.FILES['file']
    print(file_data)
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
        if math.isnan(tx_power):
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
        tmp["active_rssi"] = round(rscp-eclo, 2)
        rssi_json.append(tmp)

    return Response(status=200, data=rssi_json)

@api_view(['GET', 'DELETE', 'POST'])
def k_means(request):
    file_name = request.data.get('file_name')
    data_file = os.path.join(BASE_PATH, file_name)
    test_df = pd.read_csv(data_file)

    df = pd.read_csv(data_file)
    necessary = ['Time', 'Latitude', 'Longitude', 'Rx Power (dBm)', 'Tx Power (dBm)', 'Total Agg EcIo (dB)', 'Active RSCP (dBm)(0)']
    test_df = df[necessary]

    test_df['Rx Power (dBm)'].fillna(test_df['Rx Power (dBm)'].mean(), inplace=True)
    test_df['Tx Power (dBm)'].fillna(test_df['Rx Power (dBm)'].mean(), inplace=True)

    X=test_df.iloc[:, [5,6]].values

    k_means_json = []
    kmeans = KMeans(n_clusters=5, init ='k-means++', max_iter=300, n_init=10,random_state=0 )

    y_kmeans = kmeans.fit_predict(X)

    print(y_kmeans)

    for time, lat, long, rscp, ecio, label in zip(test_df['Time'].to_list(), test_df['Latitude'].to_list(), test_df['Longitude'].to_list(), test_df['Active RSCP (dBm)(0)'].to_list(), test_df['Total Agg EcIo (dB)'].to_list(), y_kmeans):
        tmp = dict()
        tmp["time_stamp"] = time
        tmp["coordinate"] = [lat, long]
        tmp["active_rscp"] = rscp
        tmp['active_ecio'] = ecio
        tmp['label'] = label

        k_means_json.append(tmp)

    return Response(status=200, data=k_means_json)

@api_view(['GET', 'DELETE', 'POST'])
def get_csv_data(request):

    file_name = request.data.get('file_name')
    data_file = os.path.join(BASE_PATH, file_name)
    file = open(data_file)
    csv_data = file.read()
    return Response(status=200, data=str(csv_data))
