# views.py
from rest_framework import generics
from .models import PressRelease
from press.serilizers import PressReleaseSerializer
from rest_framework.pagination import PageNumberPagination

class PressReleaseList(generics.ListCreateAPIView):
    queryset = PressRelease.objects.all()
    serializer_class = PressReleaseSerializer
    pagination_class = PageNumberPagination

class PressReleaseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PressRelease.objects.all()
    serializer_class = PressReleaseSerializer
