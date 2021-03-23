from django.urls import path
from .views import GetAllAnswersView, GetAnswersFromQuestion

urlpatterns = [
    path("view_answers", GetAllAnswersView.as_view()),
    path("get_answers_from_question", GetAnswersFromQuestion.as_view())
]
