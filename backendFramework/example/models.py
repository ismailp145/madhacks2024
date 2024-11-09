from django.db import models

# Create your models here.

class Scraper(models.Model):
    subject = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    time_taken = models.FloatField()
