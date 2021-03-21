from django.http.response import Http404
from note.models import Note
from rest_framework.views import APIView
from rest_framework import generics, status
from .serializers import *
from .models import Question
from rest_framework.response import Response
# Create your views here.

def get_note_object(note_id):
    try:
        return Note.objects.get(pk=note_id)
    except Note.DoesNotExist:
        raise Http404

def get_question_object(question_id):
    try:
        return Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404

class GetQuestionsView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class CreateQuestionsView(APIView):
    serializer_class = QuestionCreateSerializer
    look_up_kwarg = "note_id"
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        note_id = request.GET.get(self.look_up_kwarg)
        print(note_id)
        if serializer.is_valid():
            question_title = serializer.data.get("question_title")
            note = get_note_object(note_id)
            question = Question(note=note, question_title=question_title)
            question.save()
            return Response(QuestionCreateSerializer(question).data, status=status.HTTP_200_OK)

        return Response({"Bad Request": "Cannot create Question"}, status=status.HTTP_400_BAD_REQUEST)

class GetSingleQuestionView(APIView):
    def get(self, request, format=None):
        question = get_question_object(request.GET.get("question_id"))
        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EditAndDeleteQuestion(APIView):
    serializer_class = EditQuestionSerializer
    look_up_kwarg = "question_id"

    def get(self, request, format=None):
        question = get_question_object(request.GET.get(self.look_up_kwarg))
        serializer = self.serializer_class(question)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, format=None):
        question = get_question_object(request.GET.get(self.look_up_kwarg))
        serializer = self.serializer_class(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Cannot Edit"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        question:Question = get_question_object(request.GET.get(self.look_up_kwarg))
        question.delete()
        return Response({"Success": "Question deleted"}, status=status.HTTP_204_NO_CONTENT)


class GetQuestionsFromNoteView(APIView):
    look_up_kwarg = "note_id"
    def get(self, request, format=None):
        note_id = request.GET.get(self.look_up_kwarg)
        notes = Note.objects.filter(id=note_id)
        if notes.exists():
            note = notes[0]
            temp_arr = self.get_question_set(note)
            return Response(temp_arr, status=status.HTTP_200_OK)
        print("Note id >>>",  note_id)
        return Response({"Bad": "Not exist"}, status=status.HTTP_403_FORBIDDEN)
    
    def get_question_set(self, note):
        temp_arr = []
        for question in note.question_set.all():
            temp_dict = {}
            temp_dict["id"] = question.id
            temp_dict["question_title"] = question.question_title
            temp_dict["categories"] = question.categories
            temp_arr.append(temp_dict)
        return temp_arr
    