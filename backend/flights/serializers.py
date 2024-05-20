# serializers.py
from rest_framework import serializers
from .models import *


class FlightSerializer(serializers.ModelSerializer):
    total_price_including_gst = serializers.SerializerMethodField()
    arrival_airport_name = serializers.CharField(source='arrival_airport.name', read_only=True)
    classes_name = serializers.CharField(source='classes.name', read_only=True)
    departure_airport_name = serializers.CharField(source='departure_airport.name', read_only=True)
    departure_code = serializers.CharField(source='departure_airport.code', read_only=True)
    arrival_code = serializers.CharField(source='arrival_airport.code', read_only=True)

    class Meta:
        model = Flight
        fields = '__all__'

    def get_total_price_including_gst(self, obj):
        return obj.total_price()


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'


class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = '__all__'
class InsurancePolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    passengers = serializers.PrimaryKeyRelatedField(queryset=Passenger.objects.all(), many=True)

    class Meta:
        model = Booking
        fields = '__all__'


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'



class ConnectionFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionFlight
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"


class PassengerReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = "__all__"
