# Generated by Django 3.0.7 on 2021-02-15 02:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210214_2022'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='host',
            new_name='session',
        ),
    ]