# Generated by Django 4.2 on 2023-04-08 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('director', models.CharField(max_length=255)),
                ('release_date', models.DateField()),
                ('summary', models.TextField()),
                ('poster', models.ImageField(upload_to='posters/')),
            ],
        ),
    ]
