from django.contrib.auth.models import User
from django.db import models
import string
import random

# Create your models here.
def generate_unique_key():
    length = 12
    key = ""
    while True:
        key = "".join(random.choices(string.digits+string.ascii_letters, k=length))
        if User.objects.filter(user_key=key).count() == 0:
            break
    return key

class User(models.Model):
    user_name = models.CharField(max_length=50, null=False, blank=True, unique=True)
    password = models.CharField(max_length=50)
    user_key = models.CharField(max_length=12, unique=True, default=generate_unique_key)