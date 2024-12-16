from django.shortcuts import render
from django.http import JsonResponse
from .serializers import ProductSerializer
from .models import Products
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
def getProductsList(request):
    products = Products.objects.all()
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)

