from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from .models import *
from flights.serializers import *
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser



class FlightView(generics.ListCreateAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class FlightDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class AirportListCreateAPIView(generics.ListCreateAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer

class AirportRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer




class PassengerList(APIView):
    def get(self, request):
        passengers = Passenger.objects.all()
        serializer = PassengerSerializer(passengers, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = PassengerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PassengerDetail(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAdminUser]
    def get_object(self, pk):
        try:
            return Passenger.objects.get(pk=pk)
        except Passenger.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)


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
    

class InsuranceList(APIView):
    def get(self, request):
        insurance = InsurancePolicy.objects.all()
        serializer = InsurancePolicySerializer(insurance, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = InsurancePolicySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class InsuranceDetail(APIView):
    
    def get_object(self, pk):
        try:
            return InsurancePolicy.objects.get(pk=pk)
        except InsurancePolicy.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)


    def get(self, request, pk):
        insurance = self.get_object(pk)
        serializer = InsurancePolicySerializer(insurance)
        return Response(serializer.data)

    def put(self, request, pk):
        insurance = self.get_object(pk)
        serializer = InsurancePolicySerializer(insurance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        insurance = self.get_object(pk)
        insurance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FoodList(APIView):
    def get(self, request):
        food = Food.objects.all()
        serializer = FoodSerializer(food, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class FoodDetail(APIView):
    
    def get_object(self, pk):
        try:
            return Food.objects.get(pk=pk)
        except Food.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)


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

class ConnectingFlightList(APIView):
    def get(self, request):
        flight = ConnectionFlight.objects.all()
        serializer = ConnectionFlightSerializer(flight, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ConnectionFlightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ConnectingFlightDetail(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    def get_object(self, pk):
        try:
            return ConnectionFlight.objects.get(pk=pk)
        except ConnectionFlight.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)


    def get(self, request, pk):
        flight = self.get_object(pk)
        serializer = ConnectionFlightSerializer(flight)
        return Response(serializer.data)

    def put(self, request, pk):
        flight = self.get_object(pk)
        serializer = ConnectionFlightSerializer(flight, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        flight = self.get_object(pk)
        flight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookingList(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            # Check if the flight has available seats
            flight_id = serializer.validated_data['flight'].id
            flight = Flight.objects.get(pk=flight_id)
            if flight.available_seats > 0:
                serializer.save(passenger=request.user)
                # Reduce available seats for the booked flight
                payment_info = request.data.get('payment_info', None)
                if payment_info:
                    # Process payment here
                    # For demonstration, we just mark the booking as paid
                    serializer.save(passenger=request.user, is_paid=True)
                    flight.available_seats -= 1
                    flight.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': 'Payment information is required'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'No available seats on this flight'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class BookingDetail(APIView):
    def delete(self, request, booking_id):
        try:
            booking = Booking.objects.get(pk=booking_id)
            if request.user == booking.passenger or request.user.is_staff:
                # Refund logic
                if booking.is_paid:
                    # Your refund logic goes here
                    # For demonstration, we'll just mark the booking as not paid
                    booking.is_paid = False
                    booking.save()
                # Cancel the booking
                booking.delete()
                # Increase available seats for the canceled booking's flight
                booking.flight.available_seats += 1
                booking.flight.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'You are not authorized to cancel this booking'}, status=status.HTTP_403_FORBIDDEN)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)