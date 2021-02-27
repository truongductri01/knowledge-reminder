from django.urls import path
from .views import index

app_name = "frontend"

urlpatterns = [
    path("", index, name=""),
    path("log_in/", index),
    path("sign_up/", index)
]
