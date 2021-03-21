from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title", "note", "categories", "pk")

class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title", "categories")

class QuestionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title", "categories")

class EditQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title",)

