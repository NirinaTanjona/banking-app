import json
from decimal import Decimal
from json import JSONDecodeError
from rest_framework import parsers, renderers
from django.http import JsonResponse
from .serializers import UserSerializer, TransactionSerializer
from .models import User , Transaction
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin,UpdateModelMixin,RetrieveModelMixin, DestroyModelMixin, CreateModelMixin


class UserRegister(APIView):
    '''
    User for user sign-up
    '''
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request):
        data = JSONParser().parse(request)
        try:
            user = User.objects.create_user(
                username=data['username'],
                password=data['password'],
            )
            return Response({'message': 'You are registered'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': f'Error in registration: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.GenericViewSet):
    '''
    View for showing User name and balance with, all user transactions
    '''

    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer


    @action(detail=False, serializer_class=TransactionSerializer, permission_classes = (IsAuthenticated,))
    def getUserData(self, request):
        try:
            user = request.user
            transaction = Transaction.objects.filter(sender=user) | Transaction.objects.filter(receiver=user)
            serializer = self.get_serializer(transaction, many=True)
            data = {
                'id': user.id,
                'username': user.username,
                'balance': user.balance,
                'transactions': serializer.data
            }
            return Response(data)
        except Exception as e:
            return Response({'message': f'Error in: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def deposit(self, request, pk=None):
        try:
            user = self.get_object()
            qty = Decimal(request.data['quantity'])
            receiver_id = request.data['receiver']
            if receiver_id:
                receiver = User.objects.get(pk=receiver_id)
                user.deposit(qty, receiver)
            else:
                user.deposit(qty)
            return Response({'message': f'Deposit Successfull!'})
        except Exception as e:
            return Response({'message': f'Error in:  {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def withdraw(self, request, pk=None):
        try:
            user = self.get_object()
            qty = Decimal(request.data['quantity'])
            user.withdraw(qty)
            return Response({'message': f'withdrawal Successfull!'})
        except Exception as e:
            return Response({'message': f'Error in:  {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)



class AdminUsersDataViewSet(
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    viewsets.GenericViewSet):
    '''
    Viewset that shows all User for admin user
    '''

    def get_queryset(self):
        return User.objects.all()

    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class AdminTransactionDataViewSet(
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    viewsets.GenericViewSet):
    '''
    Viewset that shows all User for admin user
    '''

    def get_queryset(self):
        return Transaction.objects.all()

    serializer_class = TransactionSerializer
    permission_classes = [IsAdminUser]