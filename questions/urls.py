from django.urls import path
from .views import *

urlpatterns = [
    path("view_questions", GetQuestionsView.as_view()),
    path("get_question", GetSingleQuestionView.as_view()),
    path("create_question", CreateQuestionsView.as_view()),
    path("get_questions_from_note", GetQuestionsFromNoteView.as_view()),
    path("edit_delete_question", EditAndDeleteQuestion.as_view())
]
