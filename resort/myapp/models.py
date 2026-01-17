from django.db import models


class Hotel(models.Model):
    TYPE_CHOICES = [
        ('5-star', '5-Star'),
        ('4-star', '4-Star'),
        ('3-star', '3-Star'),
    ]

    name = models.CharField(max_length=255, db_index=True)          
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, db_index=True)  
    overview = models.TextField()
    location = models.CharField(max_length=255, db_index=True)      
    photos = models.JSONField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["type"]),                 
            models.Index(fields=["name"]),                
            models.Index(fields=["location"]),             
            models.Index(fields=["type", "location"]),     
        ]

    def __str__(self):
        return self.name


class Room(models.Model):
    hotel = models.ForeignKey(
        Hotel,
        related_name='rooms',
        on_delete=models.CASCADE,
        db_index=True 
    )
    room_type = models.CharField(max_length=50, db_index=True)     
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True) 
    availability = models.BooleanField(default=True, db_index=True) 
    photos = models.JSONField(default=list, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["hotel", "availability"]),  
            models.Index(fields=["hotel", "room_type"]),     
        ]

    def __str__(self):
        return f"{self.room_type} - {self.hotel.name}"


class Booking(models.Model):
    ROOM_TYPES = [
        ("Deluxe Room", "Deluxe Room"),
        ("Luxury Villa", "Luxury Villa"),
        ("Premium Cottage", "Premium Cottage"),
    ]

    full_name = models.CharField(max_length=150, db_index=True)  
    email = models.EmailField(db_index=True)                     
    mobile_number = models.CharField(max_length=20, blank=True, null=True, db_index=True)

    date = models.DateField(db_index=True)  

    room_type = models.CharField(
        max_length=50,
        choices=ROOM_TYPES,
        blank=True,
        null=True,
        db_index=True,                       
    )
    check_in = models.DateField(blank=True, null=True, db_index=True)
    check_out = models.DateField(blank=True, null=True, db_index=True)

    safari_type = models.CharField(max_length=50, blank=True, null=True, db_index=True)
    safari_time = models.CharField(max_length=50, blank=True, null=True)

    additional_requests = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)  

    form_type = models.CharField(
        max_length=20,
        default="booking",
        db_index=True,  
    )

    class Meta:
        indexes = [
            models.Index(fields=["form_type", "created_at"]),  
            models.Index(fields=["email", "created_at"]),      
        ]

    def __str__(self):
        return f"{self.full_name} - {self.form_type}"
