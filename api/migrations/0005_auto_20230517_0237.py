# Generated by Django 3.2 on 2023-05-17 02:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20230430_0919'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MoviesReview',
        ),
        migrations.AlterModelOptions(
            name='moviecast',
            options={'managed': False, 'verbose_name': 'Movie Cast', 'verbose_name_plural': 'Movie Casts'},
        ),
    ]
