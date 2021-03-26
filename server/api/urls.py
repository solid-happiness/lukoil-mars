from django.urls import path
from . import views

urlpatterns = [
    path('emulate/', views.create_emulation),
]
