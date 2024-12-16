from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.



@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'route': '/products',
            'usage': 'Fetches all the products'
        },
        {
            'route': '/products/<int : id>',
            'usage': 'Fetches single proc'
        },
        
    ]
    return Response(routes)

