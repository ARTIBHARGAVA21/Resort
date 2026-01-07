from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Hotel, Room
from .serializers import*
from django.db.models import Q


#This View class is shown all star rating
class HotelsAPIView(APIView):
    def get(self, request):
        hotels = Hotel.objects.all()
        data = {
            "5_star": [],
            "4_star": [],
            "3_star": [],
        }

        for hotel in hotels:
            if hotel.type == '5-star':
                data["5_star"].append(HotelSerializer(hotel).data)
            elif hotel.type == '4-star':
                data["4_star"].append(HotelSerializer(hotel).data)
            elif hotel.type == '3-star':
                data["3_star"].append(HotelSerializer(hotel).data)

        return Response(data)

    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        hotel = get_object_or_404(Hotel, id=id)
        serializer = HotelSerializer(hotel, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        hotel = get_object_or_404(Hotel, id=id)
        hotel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class HotelDetailAPIView(APIView):
    def get(self, request, id):
        hotel = get_object_or_404(Hotel, id=id)
        serializer = HotelSerializer(hotel)
        return Response(serializer.data)
 
 
 #This view is shown 5 star rating   

class FiveStarHotelsAPIView(APIView):
    def get(self, request, id=None):
        if id:
            hotel = get_object_or_404(Hotel, id=id, type='5-star')
            serializer = HotelSerializer(hotel)
            return Response(serializer.data)
        else:
            five_star_hotels = Hotel.objects.filter(type='5-star')
            serializer = HotelSerializer(five_star_hotels, many=True)
            return Response(serializer.data)

    def post(self, request):
        request.data['type'] = '5-star'
        serializer = HotelSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        hotel = get_object_or_404(Hotel, id=id, type='5-star')
        serializer = HotelSerializer(hotel, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        hotel = get_object_or_404(Hotel, id=id, type='5-star')
        hotel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

 #This view is shown 3 star rating

class ThreeStarHotelsAPIView(APIView):
    def get(self, request, id=None):
        if id:
            hotel = get_object_or_404(Hotel, id=id, type='3-star')
            serializer = HotelSerializer(hotel)
            return Response(serializer.data)
        else:
            three_star_hotels = Hotel.objects.filter(type='3-star')
            serializer = HotelSerializer(three_star_hotels, many=True)
            return Response(serializer.data)

    def post(self, request):
        request.data['type'] = '3-star'
        serializer = HotelSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        hotel = get_object_or_404(Hotel, id=id, type='3-star')
        serializer = HotelSerializer(hotel, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        hotel = get_object_or_404(Hotel, id=id, type='3-star')
        hotel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



 #This view is shown 4 star rating
class FourStarHotelsAPIView(APIView):
    def get(self, request, id=None):
        if id:
            hotel = get_object_or_404(Hotel, id=id, type='4-star')
            serializer = HotelSerializer(hotel)
            return Response(serializer.data)
        else:
            four_star_hotels = Hotel.objects.filter(type='4-star')
            serializer = HotelSerializer(four_star_hotels, many=True)
            return Response(serializer.data)

    def post(self, request):
        request.data['type'] = '4-star'
        serializer = HotelSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        hotel = get_object_or_404(Hotel, id=id, type='4-star')
        serializer = HotelSerializer(hotel, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        hotel = get_object_or_404(Hotel, id=id, type='4-star')
        hotel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
 #This view is to add rooms   
# class RoomAPIView(APIView):
#     def get(self, request, hotel_id=None, room_id=None):
#         if hotel_id and room_id:  
#             room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id)
#             serializer = RoomSerializer(room)
#             return Response(serializer.data)
#         elif hotel_id:  
#             rooms = Room.objects.filter(hotel_id=hotel_id)
#             serializer = RoomSerializer(rooms, many=True)
#             return Response(serializer.data)
#         else:  
#             rooms = Room.objects.all()
#             serializer = RoomSerializer(rooms, many=True)
#             return Response(serializer.data)

#     def post(self, request, hotel_id=None):
#         if hotel_id:  
#             request.data['hotel'] = hotel_id
#             serializer = RoomSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response({"error": "Hotel ID is required to create a room."}, status=status.HTTP_400_BAD_REQUEST)




class RoomAPIView(APIView):
    def get(self, request, hotel_id=None, room_id=None):
        if hotel_id and room_id:  
            room = get_object_or_404(
                Room.objects.filter(hotel__type='5-star'), 
                id=room_id, 
                hotel_id=hotel_id
            )
            serializer = RoomSerializer(room)
            return Response(serializer.data)
        elif hotel_id:  
            rooms = Room.objects.filter(hotel_id=hotel_id, hotel__type='5-star')
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data)
        else:  
            rooms = Room.objects.filter(hotel__type='5-star')
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data)

    def post(self, request, hotel_id=None):
        if hotel_id:  
            hotel = get_object_or_404(Hotel, id=hotel_id, type='5-star')
            request.data['hotel'] = hotel_id
            serializer = RoomSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Hotel ID is required to create a room."}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='5-star')
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='5-star')
        serializer = RoomSerializer(room, data=request.data, partial=True)  # partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='5-star')
        room.delete()
        return Response({"message": "Room deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    def post(self, request, hotel_id=None):
        if hotel_id:  
            hotel = get_object_or_404(Hotel, id=hotel_id, type='5-star')
            request.data['hotel'] = hotel_id
            serializer = RoomSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Hotel ID is required to create a room."}, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class ThreeStarRoomAPIView(APIView):
    def get(self, request, hotel_id=None, room_id=None):
        if hotel_id and room_id:  
            room = get_object_or_404(
                Room.objects.filter(hotel__type='3-star'), 
                id=room_id, 
                hotel_id=hotel_id
            )
            serializer = RoomSerializer(room)
            return Response(serializer.data)
        elif hotel_id:  
            rooms = Room.objects.filter(hotel_id=hotel_id, hotel__type='3-star')
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data)
        else:  
            rooms = Room.objects.filter(hotel__type='3-star')
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data)

    def post(self, request, hotel_id=None):
        if hotel_id:  
            hotel = get_object_or_404(Hotel, id=hotel_id, type='3-star')
            request.data['hotel'] = hotel_id
            serializer = RoomSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Hotel ID is required to create a room."}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='3-star')
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='3-star')
        serializer = RoomSerializer(room, data=request.data, partial=True)  # partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='3-star')
        room.delete()
        return Response({"message": "Room deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class RoomAPIView4Star(APIView):
    def get(self, request, hotel_id=None, room_id=None):
        if hotel_id and room_id:  
            room = get_object_or_404(
                Room.objects.filter(hotel__type='4-star'), 
                id=room_id, 
                hotel_id=hotel_id
            )
            serializer = RoomSerializer(room)
            return Response(serializer.data)
        elif hotel_id:  
            rooms = Room.objects.filter(hotel_id=hotel_id, hotel__type='4-star')
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data)
        else:  
            rooms = Room.objects.filter(hotel__type='4-star')
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data)

    def post(self, request, hotel_id=None):
        if hotel_id:  
            hotel = get_object_or_404(Hotel, id=hotel_id, type='4-star')
            request.data['hotel'] = hotel_id
            serializer = RoomSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Hotel ID is required to create a room."}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='4-star')
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='4-star')
        serializer = RoomSerializer(room, data=request.data, partial=True)  # partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, hotel_id=None, room_id=None):
        room = get_object_or_404(Room, id=room_id, hotel_id=hotel_id, hotel__type='4-star')
        room.delete()
        return Response({"message": "Room deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class SearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '').strip().lower()

        if not query:
            return Response({"error": "Query parameter 'q' is required"}, status=400)

        # Map keywords to hotel types
        star_mapping = {
            "5 star": "5-star",
            "5-star": "5-star",
            "five star": "5-star",

            "4 star": "4-star",
            "4-star": "4-star",
            "four star": "4-star",

            "3 star": "3-star",
            "3-star": "3-star",
            "three star": "3-star",
        }

        hotel_type = None

        # Check if query matches star category
        for key, value in star_mapping.items():
            if key in query:
                hotel_type = value

        # Search condition
        filters = Q()

        if hotel_type:
            filters |= Q(type=hotel_type)

        # Keyword search for custom services
        filters |= Q(name__icontains=query) | Q(description__icontains=query) | Q(location__icontains=query)

        # Extra services keywords
        service_keywords = ["safari", "booking", "holiday", "package", "taxi", "flight"]

        for kw in service_keywords:
            if kw in query:
                filters |= Q(name__icontains=kw) | Q(description__icontains=kw)

        # Final Search
        hotels = Hotel.objects.filter(filters).distinct()

        serializer = HotelSerializer(hotels, many=True)
        return Response({
            "query": query,
            "results": serializer.data
        })




class BookingAPIView(APIView):
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Booking submitted successfully!",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class HotelMapLinkAPIView(APIView):
    def get(self, request, id):
        hotel = get_object_or_404(Hotel, id=id)
        query = urllib.parse.quote(hotel.location)
        map_url = f"https://www.google.com/maps/search/?api=1&query={query}"
        return Response({"id": hotel.id, "name": hotel.name, "map_url": map_url})