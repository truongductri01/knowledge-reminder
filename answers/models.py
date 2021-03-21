from django.db import models
from django.db.models.deletion import CASCADE
from questions.models import Question

# Create your models here.
class Answer(models.Model):
    answer_content = models.TextField()
    question = models.ForeignKey(Question, on_delete=CASCADE)

    def __str__(self) -> str:
        return self.answer_content[:15]  # the first 15 characters    