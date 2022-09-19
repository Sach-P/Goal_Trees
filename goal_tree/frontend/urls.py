from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('home', index),
    path('login', index),
    path('register', index),
    path('home/mytrees', index),
    path('home/mytrees/<str:treeId>/<str:treeTitle>', index),
]
