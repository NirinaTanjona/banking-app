from api.models import User
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User, weak=False)
def report_uploaded(instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)