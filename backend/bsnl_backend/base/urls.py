from django.urls import include, path
from rest_framework import routers
from . import views


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/v1/upload_file', views.upload_file, name="upload_file"),
    path('api/v1/all_files', views.all_files, name="all_files")
]