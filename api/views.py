from django.http.response import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.views.generic import ListView
from rest_framework.views import APIView
from .models import User
from .forms import *
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import SignUpSerializer, UserSerializer, LogInSerializer
# Create your views here.

class UserListView(generics.ListAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class SignUpView(APIView):
    serializer_class=SignUpSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print("Valid serializer")
        
        user_name = serializer.data.get("user_name")
        password = serializer.data.get("password")
        user = User.objects.filter(user_name = user_name)
        if user.exists():
            return Response({"Bad Request": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User(user_name = user_name, password = password)
            user.save()
            return Response(SignUpSerializer(user).data, status=status.HTTP_200_OK)
            
class LogInView(APIView):
    serializer_class=LogInSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        # print(request.POST)
        if serializer.is_valid():
            print("Serializer is Valid")
        print(serializer.data)
        user_name = serializer.data.get("user_name")
        password=serializer.data.get("password")
        users = User.objects.filter(user_name=user_name)
        if users.exists():
            if password == users[0].password:
                user_key = users[0].user_key
                self.request.session["logged_in"] = True
                self.request.session["user_key"] = user_key
                data = {"user_key": user_key, 'logged_in': True}
                return JsonResponse(data, status=status.HTTP_200_OK)       

            return Response({"Invalid": "Invalid username or password"}, status=status.HTTP_403_FORBIDDEN)       
        return Response({"Bad Request": "Invalid user"}, status=status.HTTP_403_FORBIDDEN)

class UserLoggedIn(APIView):
    def get(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        if self.request.session.has_key("user_key") and self.request.session.has_key("logged_in"):
            data = {"user_key": self.request.session["user_key"], 'logged_in': self.request.session["logged_in"]}
            return JsonResponse(data, status=status.HTTP_200_OK) 
        return JsonResponse({"Bad Request": "No valid username"}, status=status.HTTP_400_BAD_REQUEST)

class LogOutView(APIView):
    def post(self, request, format=None):
        if "user_key" in self.request.session and "logged_in" in self.request.session:
            self.request.session.pop("user_key")
            self.request.session.pop("logged_in")
        
            return Response({"Message": "Success"}, status=status.HTTP_200_OK)
        return Response({"Bad Request: Not logged In yet"}, status=status.HTTP_400_BAD_REQUEST)

