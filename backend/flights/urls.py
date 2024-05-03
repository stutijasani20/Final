
from django.urls import path
from .views import *

urlpatterns = [
    path('flights/', FlightView.as_view(), name='flight-list-create'),
    path('flights/<int:pk>/', FlightDetails.as_view()),
    
    path('airports/', AirportListCreateAPIView.as_view(), name='airport-list'),
    path('airports/<int:pk>/', AirportRetrieveUpdateDestroyAPIView.as_view(), name='airport-detail'),

    path('passengers/', PassengerList.as_view(), name='passenger-list'),
    path('passengers/<int:pk>/', PassengerDetail.as_view(), name='passenger-detail'),

    path('food/', FoodList.as_view(), name='food-list'),
    path('food/<int:pk>/', FoodDetail.as_view(), name='food-detail'),

    path('insurance/', InsuranceList.as_view(), name='insurance-list'),
    path('insurance/<int:pk>/', InsuranceDetail.as_view(), name='insurance-detail'),

    path('connectingflights/', ConnectingFlightList.as_view(), name='connecting-list'),
    path('connectingflights/<int:pk>/', ConnectingFlightDetail.as_view(), name='connecting-detail'),

    path('booking/', BookingList.as_view(), name='booking-list'),
    path('booking/<int:pk>/', BookingDetail.as_view(), name='booking-detail'),


]
