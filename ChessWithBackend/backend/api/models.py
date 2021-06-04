from django.db import models
import random
# Create your models here.
def genCode():
    length = 6
    while True:
        code = random.randint(10000,99999)
        if Room.objects.filter(code=code).count == 0:
            return code


class Room(models.Model):
    code = models.CharField(max_length=6, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)