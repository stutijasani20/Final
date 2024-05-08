from django.db import models
from users.models import *
from django.core.exceptions import ValidationError

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
        raise ValidationError("Price cannot be zero.")

class Class(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Flight(models.Model):
    flight_number = models.CharField(max_length=20)
    departure_airport = models.ForeignKey(Airport,  related_name='departures',on_delete=models.CASCADE)
    arrival_airport = models.ForeignKey(Airport, related_name='arrival',on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.IntegerField(validators=[validate_non_zero])
    available_seats = models.IntegerField(default=0)
    classes = models.ForeignKey(Class, on_delete=models.CASCADE)

    def total_price(self):
        gst = 0.12
        total_price = self.price + (self.price * gst)
        return total_price

   

    def __str__(self):
        return self.flight_number
    
class Passenger(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return str(self.name)
    


class Food(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    code = models.CharField(max_length=100)
   


    def __str__(self):
        return self.name

class InsurancePolicy(models.Model):
    policy_type = models.CharField(max_length=100)
    coverage_details = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2, validators=[validate_non_zero])

    def __str__(self):
        return self.policy_type

class ConnectionFlight(models.Model):
    from_flight = models.ForeignKey(Flight, related_name='from_flight', on_delete=models.CASCADE)
    to_flight = models.ForeignKey(Flight, related_name='to_flight', on_delete=models.CASCADE)
    layover_time = models.DurationField()
    
    def __str__(self):
        return f"From {self.from_flight} to {self.to_flight}"

class Booking(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    passenger = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.passenger} - {self.flight}"

class Payment(models.Model):
    method_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"Payment of {self.amount}"
