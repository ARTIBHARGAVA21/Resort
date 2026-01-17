import urllib.parse
from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Hotel, Room
from .serializers import (
    HotelListSerializer,
    HotelDetailSerializer,
    RoomSerializer,
    BookingSerializer
)


def hotel_list_qs():
    # Fast list queries
    return Hotel.objects.all()


def hotel_detail_qs():
    return Hotel.objects.all().prefetch_related("rooms")


class HotelsAPIView(APIView):
    """
    GET /api/hotels/  -> grouped response
    """
    def get(self, request):
        qs = hotel_list_qs()
        return Response({
            "5_star": HotelListSerializer(qs.filter(type="5-star"), many=True).data,
            "4_star": HotelListSerializer(qs.filter(type="4-star"), many=True).data,
            "3_star": HotelListSerializer(qs.filter(type="3-star"), many=True).data,
        })


class StarHotelsAPIView(APIView):
    """
    GET /api/hotels/5-star/
    GET /api/hotels/5-star/1/
    """
    def get(self, request, star, id=None):
        if id is not None:
            hotel = get_object_or_404(hotel_detail_qs().filter(type=star), id=id)
            return Response(HotelDetailSerializer(hotel).data)

        hotels = hotel_list_qs().filter(type=star)
        return Response(HotelListSerializer(hotels, many=True).data)

    def post(self, request, star):
        payload = request.data.copy()
        payload["type"] = star

        serializer = HotelDetailSerializer(data=payload)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RoomsAPIView(APIView):
    """
    GET /api/hotels/<hotel_id>/rooms/
    GET /api/hotels/<hotel_id>/rooms/<room_id>/
    """
    def get(self, request, hotel_id, room_id=None):
        qs = Room.objects.select_related("hotel").filter(hotel_id=hotel_id)

        if room_id is not None:
            room = get_object_or_404(qs, id=room_id)
            return Response(RoomSerializer(room).data)

        return Response(RoomSerializer(qs, many=True).data)

    def post(self, request, hotel_id):
        get_object_or_404(Hotel, id=hotel_id)

        payload = request.data.copy()
        payload["hotel"] = hotel_id

        serializer = RoomSerializer(data=payload)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SearchAPIView(APIView):
    """
    GET /api/search/?q=...
    """
    def get(self, request):
        query = request.query_params.get("q", "").strip()
        if not query:
            return Response({"error": "Query parameter 'q' is required"}, status=400)

        filters = (
            Q(name__icontains=query) |
            Q(location__icontains=query) |
            Q(overview__icontains=query)
        )

        hotels = hotel_list_qs().filter(filters).distinct()
        return Response({"query": query, "results": HotelListSerializer(hotels, many=True).data})


class BookingAPIView(APIView):
    """
    POST /api/booking/
    """
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Booking submitted successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )


class HotelMapLinkAPIView(APIView):
    """
    GET /api/map/<id>/
    """
    def get(self, request, id):
        hotel = get_object_or_404(Hotel, id=id)
        query = urllib.parse.quote(hotel.location)
        map_url = f"https://www.google.com/maps/search/?api=1&query={query}"
        return Response({"id": hotel.id, "name": hotel.name, "map_url": map_url})
