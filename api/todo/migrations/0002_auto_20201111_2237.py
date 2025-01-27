# Generated by Django 3.1.3 on 2020-11-11 22:37

from django.db import migrations, models
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0003_taggeditem_add_unique_index'),
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='pinned',
        ),
        migrations.AddField(
            model_name='goal',
            name='pinned',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='task',
            name='tags',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]
