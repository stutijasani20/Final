from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
import os
from django.conf import settings

def get_and_authenticate_user(email, password):
    user = authenticate(username=email, password=password)
    if user is None:
        raise serializers.ValidationError("Invalid username/password/role. Please try again!")
    return user


def create_user_account(email, password,role, 
                         **extra_fields):
    user = get_user_model().objects.create_user(
        email=email, password=password, role=role, **extra_fields)
    return user



class Utils:

    @staticmethod
    def send_mail():
        email = EmailMessage(
            subject = 'Kuch bhi',
            body = 'Helo bhai kasa tumi',
            from_email=settings.EMAIL_HOST_USER,
            # to=[data]
            to=['amul4577@gmail.com']
        )
        email.send()