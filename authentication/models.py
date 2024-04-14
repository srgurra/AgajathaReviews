from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass
User._meta.get_field('groups').remote_field.related_name = '+'
User._meta.get_field('user_permissions').remote_field.related_name = '+'
# Create your models here.
