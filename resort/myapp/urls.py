from django.urls import path
from .views import*

urlpatterns = [
    # It is used to get all hotels
    path('all-hotels/', HotelsAPIView.as_view(), name='hotels_api'),
    # It is used to get all hotels by id
    path('all-hotels/<int:id>/', HotelDetailAPIView.as_view(), name='hotel_detail_update_delete'),
     # It is used to get 5-star hotels 
    path('hotels/5-star/', FiveStarHotelsAPIView.as_view(), name='five-star-hotel-detail'),
     # It is used to get 5-star hotels by id
    path('hotels/5-star/<int:id>/', FiveStarHotelsAPIView.as_view(), name='five_star_hotels'),
     # It is used to get 3-star hotels 
    path('hotels/3-star/', ThreeStarHotelsAPIView.as_view(), name='three_star_hotels'),
     # It is used to get 3-star hotels by id
    path('hotels/3-star/<int:id>/', ThreeStarHotelsAPIView.as_view(), name='three-star-hotel-detail'),
    # It is used to get 4-star hotels 
    path('hotels/4-star/', FourStarHotelsAPIView.as_view(), name='four_star_hotels'),
    # It is used to get 4-star hotels by id
    path('hotels/4-star/<int:id>/', FourStarHotelsAPIView.as_view(), name='four-star-hotel-detail'),
    
    # It is used to get 3,4,5-star rooms  
    path('hotels/4-star/<int:hotel_id>/rooms/', RoomAPIView4Star.as_view(), name='hotel-room-list-4star'),
    path('hotels/5-star/<int:hotel_id>/rooms/', RoomAPIView.as_view(), name='hotel_rooms'),
    path('hotels/3-star/<int:hotel_id>/rooms/', ThreeStarRoomAPIView.as_view(), name='three_star_rooms_by_hotel'),
    
     # It is used to get 3,4,5-star rooms  by id
    path('hotels/5-star/<int:hotel_id>/rooms/<int:room_id>/', RoomAPIView.as_view(), name='room_detail'), 
    path('hotels/3-star/<int:hotel_id>/rooms/<int:room_id>/', ThreeStarRoomAPIView.as_view(), name='three_star_room_detail'), 
    path('hotels/4-star/<int:hotel_id>/rooms/<int:room_id>/', RoomAPIView4Star.as_view(), name='room-detail-4star'),
    
    
    path('search/', SearchAPIView.as_view(), name='hotel-search'),
    
    path("book-resort/", BookingAPIView.as_view(), name="book-resort"),
    path('hotels/<int:id>/map/', HotelMapLinkAPIView.as_view(), name='hotel-map-link'),
     
     
     
     
     
     
     
     
     
    # path('rooms/5-star/<int:hotel_id>/', RoomAPIView.as_view(), name='hotel_rooms'), 
    # path('hotels/5-star/<int:id>/rooms/', RoomAPIView.as_view(), name='all_rooms'), 
     # path('hotels/4-star/<int:hotel_id>/rooms/', FourStarHotelsAPIView.as_view(), name='four-star-hotel-detail'), 
    # path('rooms/5-star/<int:hotel_id>/', RoomAPIView.as_view(), name='hotel_rooms'),  
    # path('rooms/5-star/<int:hotel_id>/rooms/<int:room_id>/', RoomAPIView.as_view(), name='room_detail'), 
    # path('rooms/3star/', ThreeStarRoomAPIView.as_view(), name='three_star_rooms_list'),
    # path('rooms/3star/<int:hotel_id>/', ThreeStarRoomAPIView.as_view(), name='three_star_rooms_by_hotel'),
    # path('rooms/3star/<int:hotel_id>/<int:room_id>/', ThreeStarRoomAPIView.as_view(), name='three_star_room_detail'), 
    # path('rooms/4-star/', RoomAPIView4Star.as_view(), name='room-list-4star'),
    # # path('rooms/4-star/<int:hotel_id>/', RoomAPIView4Star.as_view(), name='hotel-room-list-4star'),
    # path('rooms/4-star/<int:hotel_id>/<int:room_id>/', RoomAPIView4Star.as_view(), name='room-detail-4star'),
]
