# views.py
from rest_framework import generics
from .models import PressRelease
from press.serilizers import PressReleaseSerializer

class PressReleaseList(generics.ListCreateAPIView):
    queryset = PressRelease.objects.all()
    serializer_class = PressReleaseSerializer

class PressReleaseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PressRelease.objects.all()
    serializer_class = PressReleaseSerializer
