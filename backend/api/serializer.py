from collections import OrderedDict
from .models import User, Transaction
from rest_framework_json_api import serializers
from rest_framework import status
from rest_framework.exceptions import APIException


class NotEnoughMoneyException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'There is not enough money in your account'
    default_code = 'invalid'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User,
        fields = ('balance',)

    def validate(self, res: OrderedDict):
        '''
        Used to validate Money retrieved amount
        '''
        quantity = res.get('quantity')
        user = self.instance
        if not user.check_stock(quantity):
            raise NotEnoughMoneyException
        return res
        breakpoint()

class Transaction(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ('id', 'sender', 'receiver', 'amount', 'type')