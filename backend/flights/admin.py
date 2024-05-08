from django.contrib import admin
from .models import *

admin.site.register(Flight)
admin.site.register(Airport)
admin.site.register(Passenger)
admin.site.register(Food)
admin.site.register(InsurancePolicy)
admin.site.register(ConnectionFlight)
admin.site.register(Booking)
admin.site.register(Class)

# Register your models here.
