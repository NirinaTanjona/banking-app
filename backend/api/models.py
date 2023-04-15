from decimal import Decimal
from django.db import models
from utils.model_abstracts import Model
from django_extensions.db.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser

class User(
    Model,
    AbstractUser):

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


    def __str__(self):
        return f'{self.username} model'

    balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def check_balance(self, qty):
        # Used to check if withdrawal qty exceeds the balance
        qty = Decimal(str(qty))
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
                transaction_type='D',
                amount=qty,
                receiver=receiver
            )
            receiver.save()
        else:
            self.balance += qty
            Transaction.objects.create(
                sender=self,
                transaction_type='D',
                amount=qty
            )
            self.save()

    def withdraw(self, qty):
        # Make withdrawal for own account
        if self.check_balance(qty):
            qty = Decimal(str(qty))
            self.balance -= qty
            Transaction.objects.create(
                sender=self,
                transaction_type='W',
                amount=qty
            )
            self.save()

    def transfert(self, qty, receiver):
        if self.check_balance(qty):
            qty = Decimal(str(qty))
            self.balance -= qty
            receiver.balance += qty
            receiver.save()
            Transaction.objects.create(
                sender=self,
                transaction_type='T',
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
        return f'{self.transaction_type} from {self.sender.name} to {self.receiver.name}'

    class Meta:
        ordering= ['created']
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'


    TRANSACTION_TYPE_CHOICES = [
        ('D', 'Deposit'),
        ('W', 'Withdrawal'),
        ('T', 'Transfer'),
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_user')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_user', null=True, blank=True)
    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=1, choices=TRANSACTION_TYPE_CHOICES)
