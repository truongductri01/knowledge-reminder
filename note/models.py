from django.db import models
from api.models import User
from django.utils import timezone

# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note_title = models.CharField(max_length=150, null=False, blank=False)
    created_at = models.DateField(default=timezone.now, null=False, blank=False)
    hash_tag = []
    review_cycle = []

    def __str__(self) -> str:
        return self.note_title