from note.models import Note
from rest_framework.views import APIView
from rest_framework import generics, status
from .serializers import *
from .models import Question
from rest_framework.response import Response
# Create your views here.

class GetQuestionsView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class CreateQuestionsView(APIView):
    serializer_class = QuestionSerializer
    def post(self, request, format=None):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            note_id = serializer.data.get("note")
            question_title = serializer.data.get("title")
            notes = Note.objects.filter(id=note_id)
            if notes.exists():
                question = Question(question_title=question_title, note=notes[0])
                question.save()
                return Response(QuestionSerializer(question).data, status=status.HTTP_200_OK)
            else:
                return Response({"Bad Request": "Note not exists"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": "Cannot create Question"}, status=status.HTTP_400_BAD_REQUEST)

class GetQuestionsFromNoteView(APIView):
    serilizer_class = QuestionFromNoteSerializer
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
    