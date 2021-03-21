from rest_framework import serializers
from .models import Answer

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ("answer_content", "question", "pk")

class CreateAndEditAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ("answer_content",)