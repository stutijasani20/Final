# serializers.py
from rest_framework import serializers
from .models import *


class FlightSerializer(serializers.ModelSerializer):
    total_price_including_gst = serializers.SerializerMethodField()
    arrival_airport_name = serializers.CharField(source='arrival_airport.name',read_only=True)
    classes_name = serializers.CharField(source='classes.name',read_only=True)
    departure_airport_name = serializers.CharField(source='departure_airport.name',read_only=True)
    departure_code = serializers.CharField(source='departure_airport.code',read_only=True)
    arrival_code = serializers.CharField(source='arrival_airport.code',read_only=True)

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
    passengers_count = serializers.SerializerMethodField()
    insurance_policy_opted = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['flight', 'passenger', 'booking_date', 'is_paid', 'passengers_count', 'insurance_policy_opted']

    def get_passengers_count(self, obj):
        return Passenger.objects.filter(user=obj.passenger).count()

    def get_insurance_policy_opted(self, obj):
        try:
            insurance_policy = Insurance.objects.get(user=obj.passenger)
            return True
        except Insurance.DoesNotExist:
            return False


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