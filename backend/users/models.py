from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from rest_framework.validators import UniqueTogetherValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):


    email = models.EmailField(_('email address'), unique=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    SUPERUSER = 'superuser'
    AIRPORT_STAFF = 'airport_staff'
    CUSTOMER = 'customer'

    ROLE_CHOICES = [
        (SUPERUSER, 'Superuser'),
        (AIRPORT_STAFF, 'Airport Staff'),
        (CUSTOMER, 'Customer'),
    ]

    role = models.CharField(max_length=50, choices=ROLE_CHOICES)



    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if not self.username:
            
            self.username = self.email.split('@')[0]
        while CustomUser.objects.filter(username=self.username).exists():
            self.username += '_'
        super().save(*args, **kwargs)
