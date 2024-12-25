from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', views.getRoutes, name = 'getRoutes'),
    path('products/', include('products.urls'), name = 'products'),
    path('users/',views.getUsers, name = 'getUsers'),
    path('users/login/',views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('users/profile/',views.getUserProfile, name = 'getUserProfile'),
    path('users/register/',views.registerUser, name = 'register'),
    path('activate/<uidb64>/<token>/',views.ActivateAccountView.as_view(), name = 'activate'),
]
