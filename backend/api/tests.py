from rest_framework.test import APITestCase
from api.models import User, Transaction
from rest_framework.authtoken.models import Token

class BankingApiTestCase(APITestCase):
    """
    Test for Banking API
    """

    def setUp(self):

        self.user1 = User.objects.create_user(
            username='testuser1',
            password='0976'
        )
        self.user2 = User.objects.create_user(
            username='testuser2',
            password='2817'
        )
        self.admin = User.objects.create_superuser(
            username='admin',
            password='admin'
        )

        # Create some Transactions
        Transaction.objects.create(sender=self.user1, receiver=self.user2, amount=200, type='T')
        Transaction.objects.create(sender=self.user1, amount=100, type='D')
        Transaction.objects.create(sender=self.user1, amount=50, type='W')

        # App create a Token in each user creation
        self.token1 = Token.objects.get(user=self.user1)
        self.tokenAdmin = Token.objects.get(user=self.admin)

    def test_users_role(self):
        '''
        test some users role (check if admin or user)
        '''
        self.assertEqual(self.user1.is_superuser, False)
        self.assertEqual(self.admin.is_superuser, True)

    def test_create_Transactions(self):
        '''
        test create 3 Transactions
        '''
        self.assertEqual(Transaction.objects.all().count(), 3)

    def test_check_tokens(self):
        '''
        test if token exists when user is created
        '''
        self.assertIsNotNone(self.token1)
        self.assertIsNotNone(self.tokenAdmin)

    def test_deposit_on_account(self):
        '''
        test deposit on an account
        '''
        self.user1.deposit(300)
        self.assertEqual(self.user1.balance, 300)

    def test_withdrawal_on_account(self):
        '''
        test withdrawal on own account
        '''
        deposit = 300
        withdraw = 50

        self.user1.deposit(deposit)
        self.user1.withdraw(withdraw)
        self.assertEqual(self.user1.balance, deposit - withdraw)