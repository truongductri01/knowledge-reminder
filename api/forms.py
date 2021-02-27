from django.forms import ModelForm
from .models import User
from django import forms

class SignUpForm(ModelForm):
    confirm_password = forms.CharField(max_length=50)
    class Meta:
        model = User
        fields = ["user_name", "password", "confirm_password"]

class LogInForm(forms.Form):
    user_name = forms.CharField(max_length=50)
    password = forms.CharField(max_length=50)