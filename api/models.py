from django.db import models

# Create your models here.
class User(models.Model):
    user_name = models.CharField(max_length=50, null=False, blank=True, unique=True)
    password = models.CharField(max_length=50)
