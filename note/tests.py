from django.test import TestCase
from django.urls import reverse

from .models import Note
from api.models import User

# Create your tests here.
class NoteModelTests(TestCase):
    user_name = "testing123"
    password = "testing123"
    user: User
    def setUp(self) -> None:
        User.objects.create(user_name=self.user_name, password=self.password)
        self.user = User.objects.get(user_name=self.user_name)

    def create_note(self, note_title):
        Note.objects.create(note_title=note_title, user=self.user)
        return Note.objects.get(note_title=note_title)

    def test_note_set_is_empty_initially(self):
        note_sets = self.user.note_set.all()
        self.assertEqual(len(note_sets), 0)

    def test_note_with_correct_title(self):
        note_title = "this is a test note"
        note = self.create_note(note_title)
        self.assertEqual(note_title, note.note_title)

    def test_add_one_note(self):
        note_title = "this is a test note"
        note = self.create_note(note_title)
        note_sets = self.user.note_set.all()
        self.assertEqual(len(note_sets), 1)
        self.assertEqual(note, note_sets[0])
