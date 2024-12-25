from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status



from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from products.serializers import UserSerializer, UserSerializerWithToken


#for sending mails and generating tokens

from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import TokenGenerator, generate_token
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings

from django.views.generic import View

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




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many =  True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try: 
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            password = make_password(data['password']),
        )
        '''
        #generate text and send mail 
        email_subject = "Active your account"
        message = render_to_string(
            "activate.html",
             {
            "user": user, 
            "domain": "127.0.0.1:8000",
            "uid" : urlsafe_base64_encode(force_bytes(user.pk)),
            "token": generate_token.make_token(user),
            }
               )
               
        email_message = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER, [data['email']])
        email_message.send()'''
        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message = {"detail":"User with this email is already registered"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    

class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk = uid)
        except Exception as identifier:
            user = None
        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request, "activateSuccess.html")
        else:
            return render(request, "activateFailure.html")
        