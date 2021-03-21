from django.http.response import JsonResponse
from rest_framework.views import APIView
from .models import Note
from api.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import GetAllNotesSerializer, GetNotesFromUserSerializer,NoteSerializer, CreateNoteSerializer

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
        note_id: str = request.GET.get("note_id")
        if note_id.isnumeric():
            notes = Note.objects.filter(pk=note_id)
            if notes.exists():
                note = notes[0]
                return Response(NoteSerializer(note).data, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Invalid Id"}, status=status.HTTP_400_BAD_REQUEST)

class CreateNote(APIView):
    serializer_class = CreateNoteSerializer
    def post(self, request, format = None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print("Valid")
            note = Note(user=User.objects.filter(pk=serializer.data.get("user"))[0], note_title=serializer.data.get("note_title"))
            note.save()
            return Response({"Success": "Created new Note"}, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Cannot create new Note"}, status=status.HTTP_200_OK)

class EditNote(APIView):
    pass

class DeleteNote(APIView):
    pass

    