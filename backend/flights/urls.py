from django.urls import path
from .views import *

urlpatterns = [
    path('flights/', FlightView.as_view()),
    path('flights/<int:pk>/', FlightDetailView.as_view()),
    path('airports/', AirportView.as_view()),
    path('airports/<int:pk>/', AirportDetailView.as_view()),
    path('passengers/', PassengerView.as_view()),
    path('passengers/<int:pk>/', PassengerDetailView.as_view()),
    path('foods/', FoodView.as_view()),
    path('foods/<int:pk>/', FoodDetailView.as_view()),
    path('insurance-policies/', InsurancePolicyView.as_view()),
    path('insurance-policies/<int:pk>/', InsurancePolicyDetailView.as_view()),
    path('connection-flights/', ConnectionFlightView.as_view()),
    path('connection-flights/<int:pk>/', ConnectionFlightDetailView.as_view()),
    path('bookings/', BookingView.as_view()),
    path('bookings/<int:pk>/', BookingDetailView.as_view()),
     path('bookings/<int:booking_id>/', BookingCancelView.as_view()),
    path('payments/', PaymentView.as_view()),
    path('payments/<int:pk>/', PaymentDetailView.as_view()),
    path("create-payment-intent/", CreatePaymentIntentView.as_view()),
    path("booking/", BookingListByCustomer.as_view()),
]