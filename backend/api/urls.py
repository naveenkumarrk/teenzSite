from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.getRoutes, name = 'getRoutes'),
    path('products/', include('products.urls')),
]
