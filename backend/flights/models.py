from django.db import models

class Airport(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    def __str__(self):
        return f"{self.name} ({self.code})"

class Flight(models.Model):
    flight_number = models.CharField(max_length=20)
    departure_airport = models.ForeignKey(Airport,  related_name='departures',on_delete=models.CASCADE)
    arrival_airport = models.ForeignKey(Airport, related_name='arrival',on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.IntegerField()

    def __str__(self):
        return self.flight_number