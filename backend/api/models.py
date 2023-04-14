from django.db import models
from utils.model_abstracts import Model
from django_extensions.db.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser

class User(
    Model,
    AbstractUser):

    def __str__(self):
        return f'{self.username}'

    balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)


class Transaction(
    TimeStampedModel,
    Model):

    """
    api.Transaction
    Store all banking transaction by the user
    """

    def __str__(self):
        return f'{self.type} from {self.sender} to {self.receiver}'


    TRANSACTION_TYPE_CHOICES = [
        ('D', 'Deposit'),
        ('W', 'Withdrawal'),
        ('T', 'Transfer'),
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_user')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_user')
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    type = models.CharField(max_length=1, choices=TRANSACTION_TYPE_CHOICES)
