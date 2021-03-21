from django.urls import path
from .views import *

urlpatterns = [
    path("get_questions", GetQuestionsView.as_view()),
    path("create_question", CreateQuestionsView.as_view()),
    path("get_questions_from_note", GetQuestionsFromNoteView.as_view())
]
