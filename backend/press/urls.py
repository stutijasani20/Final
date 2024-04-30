# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('press/', views.PressReleaseList.as_view(), name='press-release-list'),
    path('press/<int:pk>/', views.PressReleaseDetail.as_view(), name='press-release-detail'),
]
