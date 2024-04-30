
from django.urls import path, include
from rest_framework import routers
from  . views import *


router = routers.DefaultRouter()
router.register('', AuthViewSet, basename="authview")

urlpatterns = [
    path('api/auth/', include(router.urls)),
    path('users/', UserIndividualViewSet.as_view()),
    #  path('users/<int:pk>/', UserIndividualViewSet.as_view(), name="userdetail"),

]
