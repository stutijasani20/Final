from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status, generics, viewsets

from django.urls import reverse
from django.shortcuts import redirect

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail

from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from django.contrib.auth import logout
from django.core.exceptions import ImproperlyConfigured
from .utils import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from rest_framework import filters
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView




# class AuthViewSet(viewsets.GenericViewSet):
#     permission_classes = [AllowAny]
#     queryset = CustomUser.objects.all() 
#     serializer_class = EmptySerializer
#     serializer_classes = {
#         'login': UserLoginSerializer,
#         'register': UserRegisterSerializer,
#     }

#     @action(methods=['POST'], detail=False)
#     def login(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = get_and_authenticate_user(**serializer.validated_data)
#         serializer_class = AuthUserSerializer 
#         data = serializer_class(user).data
#         print(data)

#         return Response(data=data, status=status.HTTP_200_OK)
        
    
    
#     @action(methods=['POST',], detail=False)
#     def register(self, request):
#         serializer = self.get_serializer(data=request.data)
        
#         serializer.is_valid(raise_exception=True)
#         user = create_user_account(**serializer.validated_data)
#         data = AuthUserSerializer(user).data
#         print(user)
        
#         subject = 'Welcome to ELegance Air'

#         message = f'Hi {user}, thank you for registering in our website. We are glad to have you with us. Enjoy your journey with us.'
#         email_from = settings.EMAIL_HOST_USER
#         recipient_list = [user, ]
#         send_mail(subject, message, email_from, recipient_list)
        
        
                
#         return Response(data=data, status=status.HTTP_201_CREATED)

#     @action(methods=['POST', ], detail=False)
#     def logout(self, request):
#         logout(request)
#         data = {'success': 'Sucessfully logged out'}
#         return Response(data=data, status=status.HTTP_200_OK)
    

    


#     def get_serializer_class(self):
#         if not isinstance(self.serializer_classes, dict):
#             raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

#         if self.action in self.serializer_classes.keys():
#             return self.serializer_classes[self.action]
#         return super().get_serializer_class()


# class UserListAPIView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
#     def get(self, request, format=None):
#         print(request.user)
#         users = CustomUser.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# class UserDetailAPIView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
    

#     def get(self, request, pk, format=None):
#                 user = CustomUser.objects.get(pk=pk)
               
#                 serializer = UserSerializer(user)
#                 return Response(serializer.data, status=status.HTTP_200_OK)

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .serializers import EmptySerializer, UserLoginSerializer, UserRegisterSerializer, AuthUserSerializer, UserSerializer
from django.contrib.auth import logout
from users.utils import Utils

class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = EmptySerializer
    serializer_classes = {
        'login': UserLoginSerializer,
        'register': UserRegisterSerializer,
    }

    @action(methods=['POST'], detail=False)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_and_authenticate_user(**serializer.validated_data)
        serializer_class = AuthUserSerializer
        data = serializer_class(user).data
        print(data)

        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = create_user_account(**serializer.validated_data)
        data = AuthUserSerializer(user).data
        print(user)
        Utils.send_mail()

        # subject = 'Welcome to Elegance Air'

        # message = f'Hi {user.email}, thank you for registering on our website. We are glad to have you with us. Enjoy your journey with us.'
        # email_from = settings.EMAIL_HOST_USER
        # email = [user.email]
        # # send_mail(subject, message, email_from, recipient_list)
        # token = PasswordResetTokenGenerator().make_token(user)
        # link = 'http://localhost:3000/reset/'+'/'+token
        # body = 'Click Following Link to Reset Your Password '+link

        # send_mail(
        #     'Password Reset',
        #     f'link click and reset your password: ${body}',
        #     email_from,
        #     [email],
        #     fail_silently=False,
        # )

        return Response(data=data, status=status.HTTP_201_CREATED)

    @action(methods=['POST'], detail=False)
    def logout(self, request):
        logout(request)
        data = {'success': 'Successfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()


class UserListAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        print(request.user)
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        user = CustomUser.objects.get(pk=pk)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
