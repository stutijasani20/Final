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
from django.core.mail import send_mail
from rest_framework.views import APIView
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
from rest_framework.pagination import PageNumberPagination

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
        Utils.send_mail()

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
    pagination_class = PageNumberPagination  # Add pagination class

    def get(self, request, format=None):
        users = CustomUser.objects.all()

        # Paginate the queryset
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(users, request)

        # Serialize and return paginated data
        serializer = UserSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class UserDetailAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        user = CustomUser.objects.get(pk=pk)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, format=None):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)  # Use UserSerializer for update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
