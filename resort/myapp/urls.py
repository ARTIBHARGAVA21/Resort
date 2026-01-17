from django.urls import path
from .views import (
    HotelsAPIView,
    StarHotelsAPIView,
    RoomsAPIView,
    SearchAPIView,
    BookingAPIView,
    HotelMapLinkAPIView,
)

urlpatterns = [
    path("hotels/", HotelsAPIView.as_view()),

    path("hotels/<str:star>/", StarHotelsAPIView.as_view()),
    path("hotels/<str:star>/<int:id>/", StarHotelsAPIView.as_view()),

    path("hotels/<int:hotel_id>/rooms/", RoomsAPIView.as_view()),
    path("hotels/<int:hotel_id>/rooms/<int:room_id>/", RoomsAPIView.as_view()),

    path("search/", SearchAPIView.as_view()),
    path("booking/", BookingAPIView.as_view()),
    path("map/<int:id>/", HotelMapLinkAPIView.as_view()),
]
