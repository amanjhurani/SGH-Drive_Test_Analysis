from django.urls import include, path
from rest_framework import routers
from . import views


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/v1/upload_file', views.upload_file, name="upload_file"),
    path('api/v1/all_files', views.all_files, name="all_files"),
    path('api/v1/display_rxtx', views.display_rxtx, name="display_rxtx"),
    path('api/v1/display_rscp', views.display_rscp, name="display_rscp"),
    path('api/v1/display_eclo', views.display_eclo, name="display_eclo"),
    path('api/v1/display_rssi', views.display_rssi, name="display_rssi")
]