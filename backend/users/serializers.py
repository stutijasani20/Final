from rest_framework import serializers
from . models import *
from rest_framework.authtoken.models import Token
from django.contrib.auth import password_validation
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework.validators import UniqueTogetherValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [ "id",'email', "password", 'is_staff']
    
class AuthUserSerializer(serializers.ModelSerializer):
    jwt_token = serializers.SerializerMethodField()

    class Meta:
         model = CustomUser
         fields = ['id',"email" , "jwt_token", 'is_staff']

    def get_jwt_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return {"access": str(refresh.access_token), "refresh": str(refresh)}

class EmptySerializer(serializers.Serializer):
    pass

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True)


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)


    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password']
    def validate(self, value): 
      
        user_email = value.get('email')

        if CustomUser.objects.filter(email=user_email).exists():
            raise serializers.ValidationError("Email is already taken")
        
        return value

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        user = CustomUser.objects.create_user(email=email,password=password, **validated_data)
        return user
    
class UpdateStaffStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['is_staff']



        
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_new_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError({"new_password": "New password fields didn't match."})
        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user