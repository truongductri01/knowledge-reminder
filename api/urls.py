from django.urls import path
from .views import *

app_name = "user"
urlpatterns = [
    path("view_users", UserListView.as_view()),
    path("sign_up", SignUpView.as_view()),
    path("log_in", LogInView.as_view()),
    path("user_logged_in", UserLoggedIn.as_view()),
    path("log_out", LogOutView.as_view())
]
