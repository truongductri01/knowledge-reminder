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
        answers_set = self.get_answers_set(question)
        print(answers_set)
        return Response(answers_set, status=status.HTTP_200_OK)

    def get_answers_set(self, question):
        print(question.answer_set.all())
        temp_arr = []
        for answer in question.answer_set.all():
            temp_dict = {}
            temp_dict["id"] = answer.id
            temp_dict["question_title"] = answer.answer_content
            temp_dict["question"] = answer.question.question_title
            temp_arr.append(temp_dict)
        return temp_arr

# class GetSingleAnswer(APIView):
#     def get(self, request, )