from django.db.models import fields
from .models import Note
from api.models import User
from rest_framework import serializers

class GetAllNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields=("user", "note_title", "created_at", "pk")

class FilterNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields=("created_at",)

class GetNotesFromUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("user_key",)

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields=("user", "note_title", "created_at", "pk")

class CreateNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("note_title",)

# Note cannot be switch between users
class EditNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("note_title", "created_at")
