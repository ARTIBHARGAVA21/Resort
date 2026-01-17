from rest_framework import serializers
from .models import Hotel, Room, Booking
import urllib.parse


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"


# FAST list serializer (use this for /5-star/ list)
class HotelListSerializer(serializers.ModelSerializer):
    map_url = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "type",
            "location",
            "photos",    
            "latitude",
            "longitude",
            "map_url",
        ]

    def get_map_url(self, obj):
        if not obj.location:
            return None
        query = urllib.parse.quote(obj.location)
        return f"https://www.google.com/maps/search/?api=1&query={query}"


# Full detail serializer (use for /5-star/1/)
class HotelDetailSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)
    map_url = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "type",
            "overview",
            "location",
            "photos",
            "rooms",
            "latitude",
            "longitude",
            "map_url",
        ]

    def get_map_url(self, obj):
        if not obj.location:
            return None
        query = urllib.parse.quote(obj.location)
        return f"https://www.google.com/maps/search/?api=1&query={query}"


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"
