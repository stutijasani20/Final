# serializers.py
from rest_framework import serializers
from .models import PressRelease

class PressReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PressRelease
        fields = '__all__'
