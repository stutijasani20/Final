
from django.urls import path, include
from rest_framework import routers
from  . views import *


router = routers.DefaultRouter()
router.register('', AuthViewSet, basename="authview")

urlpatterns = [
    path('api/auth/', include(router.urls)),
   
  
    path('users/', UserListAPIView.as_view(), name='user_list_api'),
     path('users/<int:pk>/', UserDetailAPIView.as_view(), name='user_list_api'),

]
