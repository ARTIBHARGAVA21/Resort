from django.db import models

class Hotel(models.Model):
    TYPE_CHOICES = [
        ('5-star', '5-Star'),
        ('4-star', '4-Star'),
        ('3-star', '3-Star'),
    ]

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    overview = models.TextField()
    location = models.CharField(max_length=255)
    photos = models.JSONField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    

    def __str__(self):
        return self.name


class Room(models.Model):
    hotel = models.ForeignKey(Hotel, related_name='rooms', on_delete=models.CASCADE)
    room_type = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)
    photos = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.room_type} - {self.hotel.name}"


class Booking(models.Model):
    ROOM_TYPES = [
        ("Deluxe Room", "Deluxe Room"),
        ("Luxury Villa", "Luxury Villa"),
        ("Premium Cottage", "Premium Cottage"),
    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    mobile_number = models.CharField(max_length=20, blank=True, null=True)

    # Common date (for safari date or check-in date, as you like)
    date = models.DateField()

    # Room booking fields
    room_type = models.CharField(
        max_length=50,
        choices=ROOM_TYPES,
        blank=True,
        null=True,
    )
    check_in = models.DateField(blank=True, null=True)
    check_out = models.DateField(blank=True, null=True)

    # Safari booking fields
    safari_type = models.CharField(max_length=50, blank=True, null=True)
    safari_time = models.CharField(max_length=50, blank=True, null=True)

    additional_requests = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    form_type = models.CharField(
        max_length=20,
        default="booking",  # you can keep this or add choices
    )

    def __str__(self):
        return f"{self.full_name} - {self.form_type}"
