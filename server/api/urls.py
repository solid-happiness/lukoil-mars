from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.create_emulation),
]
