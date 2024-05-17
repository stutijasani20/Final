from datetime import date
from django.db import models
from users.models import *
from django.core.exceptions import ValidationError
from decimal import Decimal

class Airport(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    def __str__(self):
        return f"{self.name} ({self.code})"

def validate_non_zero(value):
    if value < 2000:
        raise ValidationError("Price cannot be less than 2000.")

class Class(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Flight(models.Model):
    flight_number = models.CharField(max_length=20)
    departure_airport = models.ForeignKey(Airport, related_name='departures', on_delete=models.CASCADE)
    arrival_airport = models.ForeignKey(Airport, related_name='arrival', on_delete=models.CASCADE)
    travel_date = models.DateField(default=date.today)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.IntegerField(validators=[validate_non_zero])
    available_seats = models.IntegerField(default=0)
    classes = models.ForeignKey(Class, on_delete=models.CASCADE)
    
    def total_price(self):
        return self.price * Decimal('0.12') + self.price
    

   
    def __str__(self):
        return self.flight_number
    

class Passenger(models.Model):
    TRAVELLER_CHOICES = [
        ('adult', 'Adult'),
        ('child', 'Child'),
        ('infant', 'Infant'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    passenger_type = models.CharField(max_length=10,choices=TRAVELLER_CHOICES, default='adult')
    




    def __str__(self):
        return str(self.name)



class ConnectionFlight(models.Model):
    from_flight = models.ForeignKey(Flight, related_name='from_flight', on_delete=models.CASCADE)
    to_flight = models.ForeignKey(Flight, related_name='to_flight', on_delete=models.CASCADE)
    layover_time = models.DurationField()
    
    def __str__(self):
        return f"From {self.from_flight} to {self.to_flight}"
    


class Meal(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    

class Insurance(models.Model):
    name = models.CharField(max_length=100)
    coverage_details = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name
    

class Booking(models.Model):
    TRIP_TYPE_CHOICES = [
        ('one_way', 'One Way'),
        ('round_trip', 'Round Trip'),
    ]

    TRAVELLER_CHOICES = [
        ('adult', 'Adult'),
        ('child', 'Child'),
        ('infant', 'Infant'),
    ]

    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    passenger = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    passengers = models.ManyToManyField(Passenger, blank=True)
    booking_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    meals = models.ManyToManyField(Meal, blank=True)
    insurance = models.ForeignKey(Insurance, on_delete=models.SET_NULL, null=True, blank=True)
    trip_type = models.CharField(max_length=20, choices=TRIP_TYPE_CHOICES, default='one_way')
   

    def calculate_total_price(self):
        flight_price = Decimal(self.flight.price)
        tax_rate = Decimal('0.12')
        total_flight_price = flight_price * (1 + tax_rate)

        insurance_price = Decimal(self.insurance.price) if self.insurance else Decimal(0)

        # Calculate passenger counts
        adult_count = self.passengers.filter(passenger_type='adult').count()
        child_count = self.passengers.filter(passenger_type='child').count()
        infant_count = self.passengers.filter(passenger_type='infant').count()

        total_price = (
            (total_flight_price * Decimal(adult_count))

            + (total_flight_price * Decimal(child_count) * Decimal('0.5'))

            + (total_flight_price * Decimal(infant_count) * Decimal('0.1'))

        )

        total_price += insurance_price
        
        return total_price
        



    
    def __str__(self):
        return f"Booking for {self.passenger} on {self.flight}"
    
    
class Payment(models.Model):
    method_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Payment of {self.amount} by {self.user}"

class Reviews(models.Model):
    passenger_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    rating = models.IntegerField()
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.passenger_name}"



