from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status, generics, viewsets

from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from django.contrib.auth import logout
from django.core.exceptions import ImproperlyConfigured
from .utils import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import filters
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView


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
        return Response(data=data, status=status.HTTP_200_OK)
        
    
    
    @action(methods=['POST',], detail=False)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = create_user_account(**serializer.validated_data)
        data = AuthUserSerializer(user).data


        return Response(data=data, status=status.HTTP_201_CREATED)

    @action(methods=['POST', ], detail=False)
    def logout(self, request):
        logout(request)
        data = {'success': 'Sucessfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)
    


    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()


    
class UserIndividualViewSet(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication] 
    permission_classes =[IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    def get_object(self):
        # Use the authenticated user from the request to retrieve individual user data
        return self.request.user