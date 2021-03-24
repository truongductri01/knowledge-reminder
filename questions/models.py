from django.db import models
from django.db.models.deletion import CASCADE
from note.models import Note

# Create your models here.
class Question(models.Model):
    question_title = models.CharField(max_length=150, blank=False, null=False, default="New Question")
    note = models.ForeignKey(Note, on_delete=CASCADE)
    answer_content = models.TextField(default="")
    categories = []  # many to many

    def __str__(self) -> str:
        return self.question_title
