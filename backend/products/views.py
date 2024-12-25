from django.shortcuts import render
from django.http import JsonResponse
from .serializers import ProductSerializer
from .models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
def getProductsList(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductDetails(request, pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)

