from django.http.response import Http404, JsonResponse
from rest_framework.views import APIView
from .models import Note
from api.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *

# Create your views here.
class GetNotes(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class=GetAllNotesSerializer

class GetNoteFromUser(APIView):
    serializer_class=GetNotesFromUserSerializer
    lookup_url_kwarg = "user_key"
    def get(self, request, format=None):
        user_key = request.GET.get(self.lookup_url_kwarg)
        print("User key >>>",user_key)
        users = User.objects.filter(user_key=user_key)
        if users.exists():
            user = users[0]
            notes = {"notes": []}
            for note in user.note_set.all():
                temp_dict = {}
                temp_dict["id"] = note.id
                temp_dict["note_title"] = note.note_title
                notes["notes"].append(temp_dict)
            return JsonResponse(notes, status=status.HTTP_200_OK)
            
        return Response({"Bad Request": "No valid user"}, status=status.HTTP_400_BAD_REQUEST)

class GetNote(APIView):
    def get(self, request, format=None):
        snippet = get_object(request.GET.get("note_id"))
        serializer = NoteSerializer(snippet)
        return Response(serializer.data)

class CreateNote(APIView):
    serializer_class = CreateNoteSerializer
    lookup_url_kwarg = "user_key"
    def post(self, request, format = None):
        user_key = request.GET.get(self.lookup_url_kwarg)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            users = User.objects.filter(user_key=user_key)
            if users.exists():
                user = users[0]
                note = Note(user=user, note_title=serializer.data.get("note_title"))
                note.save()
                return Response({"Success": "Created new Note"}, status=status.HTTP_200_OK)
            print("User not exist")
            return Response({"Unauthorized": "User does not exist"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditAndDeleteNote(APIView):
    serializer_class = EditNoteSerializer
    lookup_url_kwarg = "note_id"

    def get(self, request, format=None):
        snippet = get_object(request.GET.get(self.lookup_url_kwarg))
        serializer = EditNoteSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, format=None):
        note = get_object(note_id=request.GET.get(self.lookup_url_kwarg))
        serializer = EditNoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Not a valid serializer"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        note = get_object(request.GET.get(self.lookup_url_kwarg))
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def get_object(note_id):
        try:
            return Note.objects.get(pk=note_id)
        except Note.DoesNotExist:
            raise Http404
    