from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework import generics
import stripe
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import razorpay
from django.conf import settings
  

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
                name = request.query_params.get('name')
                if name:
                    airports = Airport.objects.filter(name=name)
                else:
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
            user_id = request.query_params.get('user')
            if user_id:
                passengers = Passenger.objects.filter(user_id=user_id)
            else:
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
                foods = Meal.objects.all()
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
                    return Meal.objects.get(pk=pk)
                except Meal.DoesNotExist:
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
                policies = Insurance.objects.all()
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
                    return Insurance.objects.get(pk=pk)
                except Insurance.DoesNotExist:
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
            try:
                serializer.save()

                # Retrieve data from serializer
                flight_id = serializer.data['flight']
                passenger_id = serializer.data['passenger']
                is_paid = serializer.data['is_paid']

                

                # Handle payment and update flight availability
                try:
                    flight = Flight.objects.get(pk=flight_id)
                    flight.available_seats -= 1
                    flight.save()
                except Flight.DoesNotExist:
                    payment = Payment.objects.create(method_name='Razorpay', amount=0, user_id=passenger_id, booking_id=serializer.data['id'])
                    payment.save()
                
                # Additional operations for insurance and food can be added here

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Initiate_payment(APIView):
    
    def post(self, request):
        booking_id = request.data.get('bookingId')
        
        try:
            booking = Booking.objects.get(pk=booking_id)
        except Booking.DoesNotExist:
            return JsonResponse({'error': 'Booking does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        amount = booking.calculate_total_price()
        
        try:
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            payment = client.order.create({'amount': int(amount), 'currency': 'INR', 'payment_capture': '1'})
            return JsonResponse(payment)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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


