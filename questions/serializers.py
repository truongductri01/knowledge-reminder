from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title", "note", "categories", "pk", "answer_content")

class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title", "categories", "answer_content")

class QuestionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title", "categories", "answer_content")

class EditQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("question_title", "answer_content")

