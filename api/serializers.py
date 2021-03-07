from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "user_name", "password", "user_key")

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("user_name", "password")

class LogInSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("user_name", "password")
