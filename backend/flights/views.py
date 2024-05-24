
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework import generics
from django.http import JsonResponse
import razorpay
from django.conf import settings
from rest_framework.pagination import PageNumberPagination
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import datetime
class FlightView(APIView):

    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 10

        departure_airport_name = request.GET.get('departure_airport_name')
        arrival_airport_name = request.GET.get('arrival_airport_name')
        price = request.GET.get('price')
        travel_date = request.GET.get('travel_date')
        class_name = request.GET.get('class_name')
       
        flights = Flight.objects.all()
        
        
        if departure_airport_name:
            flights = flights.filter(departure_airport__name__icontains=departure_airport_name)
        if arrival_airport_name:
            flights = flights.filter(arrival_airport__name__icontains=arrival_airport_name)
        if price:
            price = int(price)
            flights = flights.filter(price__lte=price)
        if travel_date:
            flights = flights.filter(travel_date=travel_date)
        if class_name:
             flights = flights.filter(classes__name=class_name)
       
        serializer = FlightSerializer(flights, many=True)
      
        return Response(serializer.data)
    

    def post(self, request):
       # Require admin user permission
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
        authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user_id = request.query_params.get('user')
               
                booking_id = request.query_params.get('bookingId')

                if user_id and booking_id:
                    passengers = Passenger.objects.filter(user_id=user_id, booking__id=booking_id)
                elif user_id:
                    passengers = Passenger.objects.filter(user_id=user_id)
                else:
                    passengers = Passenger.objects.all()

                    serializer = PassengerSerializer(passengers, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                    
            # Initialize pagination class
                pagination_class = PageNumberPagination()
                pagination_class.page_size = 10
                  # Set the number of items per page
                    
                paginated_passengers = pagination_class.paginate_queryset(passengers, request)
                    
                    # Serialize paginated queryset
                serializer = PassengerSerializer(paginated_passengers, many=True)
                    
                    # Return paginated response
                return pagination_class.get_paginated_response(serializer.data)

        def post(self, request):
                serializer = PassengerSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                   
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
class PassengerDetailView(APIView):
            # authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            # permission_classes = [IsAdminUser]
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
            authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            permission_classes = [IsAuthenticated]
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
            authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            permission_classes = [IsAdminUser]
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
            authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            permission_classes = [IsAuthenticated]
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
            authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            permission_classes = [IsAdminUser]
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
            authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            permission_classes = [IsAuthenticated]
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
            authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            permission_classes = [IsAdminUser]
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
    authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
    permission_classes = [IsAuthenticated]  # Require authentication for all methods
    
    def get(self, request):
        passenger_id = request.query_params.get('passenger')
        booking_date = request.query_params.get('booking_date')
        is_paid = request.query_params.get('is_paid')
        flight_id = request.query_params.get('flight')

        bookings = Booking.objects.all()

        if passenger_id:
            bookings = bookings.filter(passenger=passenger_id).order_by('-booking_date')
        if booking_date:
            booking_date = datetime.strptime(booking_date, '%Y-%m-%d')
            bookings = bookings.filter(booking_date__date=booking_date).order_by('-booking_date')
        if is_paid:
            is_paid = is_paid.lower() == 'true'
            bookings = bookings.filter(is_paid=is_paid).order_by('-booking_date')
        if flight_id:
            bookings = bookings.filter(flight=flight_id).order_by('-booking_date')



        paginator = PageNumberPagination()
        paginator.page_size = 10

        paginated_bookings = paginator.paginate_queryset(bookings, request)
        
        serializer = BookingSerializer(paginated_bookings, many=True)
    
        return paginator.get_paginated_response(serializer.data)
        

            
        
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()

                # Retrieve data from serializer
                flight_id = serializer.data['flight']
                passenger_id = serializer.data['passenger']
                passengers = serializer.data['passengers']

                try:
                    flight = Flight.objects.get(pk=flight_id)
    
                    flight.available_seats -= 1
                    flight.save()
                except Flight.DoesNotExist:
                    payment = Payment.objects.create(method_name='Razorpay', amount=0, user_id=passenger_id, booking_id=serializer.data['id'])
                    payment.save()

                try:
                    user_email = request.user 
                    subject = 'Booking Confirmation'
                    email_from = settings.EMAIL_HOST_USER
                    html_content = render_to_string('confirmation.html')
                    text_content = strip_tags(html_content)  
                    message = 'Thank you for booking with us. Your booking ID is ' + str(serializer.data['id'])
                    email = EmailMultiAlternatives(subject, text_content, message , email_from, [user_email])
                    email.attach_alternative(html_content, "text/html")
                    email.send()
                except Exception as e:
                    # Handle email sending failure gracefully
                    print("Failed to send confirmation email:", str(e))
                
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
        
        amount = Decimal(booking.calculate_total_price())
        
       
        
        try:
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            payment = client.order.create({'amount': int(amount), 'currency': 'INR', 'payment_capture': '1'})
            return JsonResponse(payment)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class BookingDetailView(APIView):
            authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
            permission_classes = [IsAuthenticated]
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
    authentication_classes = [JWTAuthentication]  # Use JWTAuthentication for authentication
    permission_classes = [IsAuthenticated]
    def delete(self, request, booking_id):
        try:
            booking = Booking.objects.get(pk=booking_id)
            flight = booking.flight
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


class PassengerReviewListCreate(generics.ListCreateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = PassengerReviewSerializer


class PassengerReviewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reviews.objects.all()
    serializer_class = PassengerReviewSerializer



class UserProfileView(generics.ListCreateAPIView):
    
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination




    def get_queryset(self):
        
        user_id = self.request.query_params.get('user')
    
        if user_id is not None:
            return UserProfile.objects.filter(user=user_id)
        return super().get_queryset()

class UserProfileDetail(APIView):
    def get_object(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        user_profile = self.get_object(pk)
        serializer = UserProfileSerializer(user_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    
    
