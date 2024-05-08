from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework import generics
import stripe
class FlightView(APIView):
    def get(self, request):
        flights = Flight.objects.all()
        for flight in flights:
            # Calculate total price including GST
            flight.total_price_including_gst = flight.total_price() 
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class FlightDetailView(APIView):
    def get_object(self, pk):
        try:
            return Flight.objects.get(pk=pk)
        except Flight.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        flight = self.get_object(pk)
        serializer = FlightSerializer(flight)
        return Response(serializer.data)

    def put(self, request, pk):
        flight = self.get_object(pk)
        serializer = FlightSerializer(flight, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        flight = self.get_object(pk)
        flight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AirportView(APIView):
            def get(self, request):
                airports = Airport.objects.all()
                serializer = AirportSerializer(airports, many=True)
                return Response(serializer.data)

            def post(self, request):
                serializer = AirportSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AirportDetailView(APIView):
            def get_object(self, pk):
                try:
                    return Airport.objects.get(pk=pk)
                except Airport.DoesNotExist:
                    raise Http404

            def get(self, request, pk):
                airport = self.get_object(pk)
                serializer = AirportSerializer(airport)
                return Response(serializer.data)

            def put(self, request, pk):
                airport = self.get_object(pk)
                serializer = AirportSerializer(airport, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk):
                airport = self.get_object(pk)
                airport.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

class PassengerView(APIView):
            def get(self, request):
                passengers = Passenger.objects.all()
                serializer = PassengerSerializer(passengers, many=True)
                return Response(serializer.data)

            def post(self, request):
                serializer = PassengerSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PassengerDetailView(APIView):
            def get_object(self, pk):
                try:
                    return Passenger.objects.get(pk=pk)
                except Passenger.DoesNotExist:
                    raise Http404

            def get(self, request, pk):
                passenger = self.get_object(pk)
                serializer = PassengerSerializer(passenger)
                return Response(serializer.data)

            def put(self, request, pk):
                passenger = self.get_object(pk)
                serializer = PassengerSerializer(passenger, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk):
                passenger = self.get_object(pk)
                passenger.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

class FoodView(APIView):
            def get(self, request):
                foods = Food.objects.all()
                serializer = FoodSerializer(foods, many=True)
                return Response(serializer.data)

            def post(self, request):
                serializer = FoodSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FoodDetailView(APIView):
            def get_object(self, pk):
                try:
                    return Food.objects.get(pk=pk)
                except Food.DoesNotExist:
                    raise Http404

            def get(self, request, pk):
                food = self.get_object(pk)
                serializer = FoodSerializer(food)
                return Response(serializer.data)

            def put(self, request, pk):
                food = self.get_object(pk)
                serializer = FoodSerializer(food, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk):
                food = self.get_object(pk)
                food.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

class InsurancePolicyView(APIView):
            def get(self, request):
                policies = InsurancePolicy.objects.all()
                serializer = InsurancePolicySerializer(policies, many=True)
                return Response(serializer.data)

            def post(self, request):
                serializer = InsurancePolicySerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InsurancePolicyDetailView(APIView):
            def get_object(self, pk):
                try:
                    return InsurancePolicy.objects.get(pk=pk)
                except InsurancePolicy.DoesNotExist:
                    raise Http404

            def get(self, request, pk):
                policy = self.get_object(pk)
                serializer = InsurancePolicySerializer(policy)
                return Response(serializer.data)

            def put(self, request, pk):
                policy = self.get_object(pk)
                serializer = InsurancePolicySerializer(policy, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk):
                policy = self.get_object(pk)
                policy.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

class ConnectionFlightView(APIView):
            def get(self, request):
                connections = ConnectionFlight.objects.all()
                serializer = ConnectionFlightSerializer(connections, many=True)
                return Response(serializer.data)

            def post(self, request):
                serializer = ConnectionFlightSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConnectionFlightDetailView(APIView):
            def get_object(self, pk):
                try:
                    return ConnectionFlight.objects.get(pk=pk)
                except ConnectionFlight.DoesNotExist:
                    raise Http404

            def get(self, request, pk):
                connection = self.get_object(pk)
                serializer = ConnectionFlightSerializer(connection)
                return Response(serializer.data)

            def put(self, request, pk):
                connection = self.get_object(pk)
                serializer = ConnectionFlightSerializer(connection, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk):
                connection = self.get_object(pk)
                connection.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

class BookingView(APIView):
            def get(self, request):
                bookings = Booking.objects.all()
                serializer = BookingSerializer(bookings, many=True)
                return Response(serializer.data)

            def post(self, request):
                serializer = BookingSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    flight_id = serializer.data['flight']
                    passenger_id = serializer.data['passenger']
                    is_paid = serializer.data['is_paid']

                    try:
                        flight = Flight.objects.get(pk=flight_id)
                        flight.available_seats -= 1
                        flight.save()
                        # stripe.api_key = settings.STRIPE_SECRET_KEY
                        
                        # # Create a payment intent with Stripe
                        # payment_intent = stripe.PaymentIntent.create(
                        #     amount=int(flight.total_price()),  
                        #     currency='inr',
                        #     metadata={
                        #         'flight_id': flight_id,
                        #         'passenger_id': passenger_id,
                        #         'is_paid': is_paid
                        #     }
                        # )
                        # # Return the client secret to the frontend
                        # return Response({'client_secret': payment_intent.client_secret}, status=status.HTTP_201_CREATED)
                    
                    except Flight.DoesNotExist:
                        return Response({'error': 'Flight does not exist'}, status=status.HTTP_400_BAD_REQUEST)
                    
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class BookingDetailView(APIView):
            def get_object(self, pk):
                try:
                    return Booking.objects.get(pk=pk)
                except Booking.DoesNotExist:
                    raise Http404
            def get(self, request, pk):
                booking = self.get_object(pk)
                serializer = BookingSerializer(booking)
                return Response(serializer.data)

            def put(self, request, pk):
                booking = self.get_object(pk)
                serializer = BookingSerializer(booking, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk):
                booking = self.get_object(pk)
                booking.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
class BookingCancelView(APIView):
    def delete(self, request, booking_id):
        try:
            booking = Booking.objects.get(pk=booking_id)
            flight = booking.flight
            # Increase available seats for the corresponding flight
            flight.available_seats += 1
            flight.save()
            booking.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Booking.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class PaymentView(APIView):
            def get(self, request):
                payments = Payment.objects.all()
                serializer = PaymentSerializer(payments, many=True)
                return Response(serializer.data)

            def post(self, request):
                serializer = PaymentSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentDetailView(APIView):
            def get_object(self, pk):
                try:
                    return Payment.objects.get(pk=pk)
                except Payment.DoesNotExist:
                    raise Http404

            def get(self, request, pk):
                payment = self.get_object(pk)
                serializer = PaymentSerializer(payment)
                return Response(serializer.data)

            def put(self, request, pk):
                payment = self.get_object(pk)
                serializer = PaymentSerializer(payment, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk):
                payment = self.get_object(pk)
                payment.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)





from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
stripe.api_key = settings.STRIPE_SECRET_KEY

from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from .models import Flight, Booking  # Import your models
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.conf import settings
# from .models import Flight, Booking
# import stripe

# stripe.api_key = settings.STRIPE_SECRET_KEY

# class CreatePaymentIntentView(APIView):
#     def post(self, request):
        
        
#         try:
#             flight = Flight.objects.get(pk=request.data['flight_id'])
            
#             # Assuming total_price_including_gst is the field in your Flight model representing the amount
#             amount = flight.total_price()
#             currency = 'inr'  # Adjust currency as needed
            
#             intent = stripe.PaymentIntent.create(
#                 amount=amount,
#                 currency=currency
#             )
            
#             return Response({'client_secret': intent.client_secret, 'flight_details': flight.serialize(), 'booking_details': booking.serialize()})
        
#         except Flight.DoesNotExist:
#             return Response({'error': f'Flight with ID {flight_id} not found'}, status=404)
        
#         except Booking.DoesNotExist:
#             return Response({'error': f'Booking with ID {booking_id} not found'}, status=404)
        
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)

from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    def post(self, request):
        amount = request.data.get('amount')
        
        if amount is None:
            return Response({'error': 'Amount is missing in the request'}, status=400)
        
        try:
            currency = 'inr'  # Adjust currency as needed
            
            intent = stripe.PaymentIntent.create(
                amount=int(float(amount) * 100),
                currency=currency
            )
            
            return Response({'client_secret': intent.client_secret, 'amount': amount})
        
        except Exception as e:
            return Response({'error': str(e)}, status=500)
