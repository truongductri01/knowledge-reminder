from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("title", "note", "categories")

class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("title", "note", "categories")

class QuestionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("title", "note", "categories")

class QuestionFromNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("title", "note")

