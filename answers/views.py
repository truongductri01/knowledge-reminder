from django.http.response import Http404, JsonResponse
from questions.models import Question
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Answer
from .serializers import *

# Create your views here.
def get_question(question_id):
    try:
        return Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404

def get_answer(answer_id):
    try:
        return Answer.objects.get(pk=answer_id)
    except Answer.DoesNotExist:
        raise Http404

class GetAllAnswersView(ListAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class GetAnswersFromQuestion(APIView):
    def get(self, request, format=None):
        question = get_question(request.GET.get("question_id"))
        answer = self.get_answer(question)
        return Response(answer, status=status.HTTP_200_OK)

    def get_answer(self, question):
        if len(question.answer_set.all()) == 0:
            return {}

        answer = question.answer_set.all()[0]  # there can only be 1 answer for each question
        return {
            "id": answer.id,
            "answer_content": answer.answer_content,
            "question": answer.question.question_title
        }

# class GetSingleAnswer(APIView):
#     def get(self, request, )


# Only create answer if the quesitons did not have any answer