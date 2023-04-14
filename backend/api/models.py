from decimal import Decimal
from django.db import models
from utils.model_abstracts import Model
from django_extensions.db.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser

class User(
    Model,
    AbstractUser):

    def __str__(self):
        return f'{self.username} model'

    balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def check_balance(self, qty):
        # Used to check if withdrawal qty exceeds the balance
        if qty > self.balance:
            return False
        return True

    def deposit(self, qty, receiver=None):
        # Deposite on own account

        qty = Decimal(str(qty))
        if receiver:
            receiver.balance += qty
            Transaction.objects.create(
                sender=self,
                type='D',
                amount=qty,
                receiver=receiver
            )
            receiver.save()
        else:
            self.balance += qty
            Transaction.objects.create(
                sender=self,
                type='D',
                amount=qty
            )
            self.save()

    def withdraw(self, qty):
        # Make withdrawal for own account
        qty = Decimal(str(qty))
        if self.check_balance(qty):
            self.balance -= qty
            Transaction.objects.create(
                sender=self,
                type='W',
                amount=qty
            )
            self.save()

    def transfert(self, qty, receiver):
        qty = Decimal(str(qty))
        if self.check_balance(qty):
            self.balance -= qty
            receiver.balance += qty
            receiver.save()
            Transaction.objects.create(
                sender=self,
                type='T',
                amount=qty,
                receiver=receiver
            )
            self.save()

class Transaction(
    TimeStampedModel,
    Model):

    """
    api.Transaction
    Store all banking transaction by the user
    """

    def __str__(self):
        return f'{self.type} from {self.sender} to {self.receiver}'

    class Meta:
        ordering= ['created']


    TRANSACTION_TYPE_CHOICES = [
        ('D', 'Deposit'),
        ('W', 'Withdrawal'),
        ('T', 'Transfer'),
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_user')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_user', null=True, blank=True)
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    type = models.CharField(max_length=1, choices=TRANSACTION_TYPE_CHOICES)
