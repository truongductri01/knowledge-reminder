from .views import *
from django.urls import path

urlpatterns = [
    path("view_notes", GetNotes.as_view()),
    path("view_user_notes", GetNoteFromUser.as_view()),
    path("get_note", GetNote.as_view()),
    path("create_note", CreateNote.as_view()),
    path("edit_delete_note", EditAndDeleteNote.as_view()),
    path("filter_notes", FilterNoteView.as_view())
]
