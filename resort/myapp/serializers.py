from rest_framework import serializers
from .models import Hotel, Room, Booking
import urllib.parse

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class HotelSerializer(serializers.ModelSerializer):
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
        # Use the hotel's `location` text to build a Google Maps search URL
        if not obj.location:
            return None
        query = urllib.parse.quote(obj.location)
        return f"https://www.google.com/maps/search/?api=1&query={query}"
        
        
class BookingSerializer(serializers.ModelSerializer):
    # Room booking fields – optional at field level
    room_type = serializers.ChoiceField(
        choices=Booking.ROOM_TYPES, required=False, allow_null=True, allow_blank=True
    )
    check_in = serializers.DateField(required=False, allow_null=True)
    check_out = serializers.DateField(required=False, allow_null=True)

    # Safari booking fields – optional at field level
    safari_type = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    safari_time = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Booking
        fields = "__all__"

    def validate(self, attrs):
        form_type = attrs.get("form_type")
        errors = {}

        # Room booking validation
        if form_type == "room_booking":
            if not attrs.get("room_type"):
                errors["room_type"] = "This field is required for room booking."
            if not attrs.get("check_in"):
                errors["check_in"] = "This field is required for room booking."
            if not attrs.get("check_out"):
                errors["check_out"] = "This field is required for room booking."

        # Safari booking validation
        elif form_type == "safari_booking":
            if not attrs.get("date"):
                errors["date"] = "This field is required for safari booking."
            if not attrs.get("safari_type"):
                errors["safari_type"] = "This field is required for safari booking."
            if not attrs.get("safari_time"):
                errors["safari_time"] = "This field is required for safari booking."
            if not attrs.get("full_name"):
                errors["full_name"] = "This field is required for safari booking."
            if not attrs.get("mobile_number"):
                errors["mobile_number"] = "This field is required for safari booking."

        if errors:
            raise serializers.ValidationError(errors)

        return attrs
