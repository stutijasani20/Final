
from django.urls import path
from .views import *

urlpatterns = [
    path('flights/', FlightView.as_view(), name='flight-list-create'),
    path('flights/<int:pk>/', FlightDetails.as_view()),
    
    path('airports/', AirportListCreateAPIView.as_view(), name='airport-list'),
    path('airports/<int:pk>/', AirportRetrieveUpdateDestroyAPIView.as_view(), name='airport-detail'),

]
