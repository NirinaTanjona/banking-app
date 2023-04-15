from rest_framework.test import APITestCase
from api.models import User, Transaction
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework import status

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
        Transaction.objects.create(sender=self.user1, receiver=self.user2, amount=200, transaction_type='T')
        Transaction.objects.create(sender=self.user1, amount=100, transaction_type='D')
        Transaction.objects.create(sender=self.user1, amount=50, transaction_type='W')

        # App create a Token in each user creation
        self.token1 = Token.objects.get(user=self.user1)
        self.tokenAdmin = Token.objects.get(user=self.admin)

        # Client API for test purpose
        self.client = APIClient()

        #We pass the token in all calls to the API
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)

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

    def test_deposit_on_own_account(self):
        '''
        test deposit on an account
        '''
        self.user1.deposit(300)
        self.assertEqual(self.user1.balance, 300)

    def test_deposite_on_another_account(self):
        '''
        test deposit on another account
        '''
        deposit_amount = 500
        self.user1.deposit(deposit_amount, self.user2)
        self.assertEqual(self.user2.balance, deposit_amount)
        self.assertEqual(self.user1.balance, 0)

    def test_withdrawal_on_account(self):
        '''
        test withdrawal on own account
        '''
        deposit = 300
        withdraw = 50

        self.user1.deposit(deposit)
        self.user1.withdraw(withdraw)
        self.assertEqual(self.user1.balance, deposit - withdraw)

    def test_transfert_to_an_account(self):
        '''
        test transfert money to another account
        '''
        deposit_amount = 300
        transfert_amount = 50

        self.user1.deposit(deposit_amount)
        self.user1.transfert(transfert_amount, self.user2)
        self.assertEqual(self.user2.balance, transfert_amount)
        self.assertEqual(self.user1.balance, deposit_amount - transfert_amount)

    def test_register_user_and_obtain_token(self):
        '''
        test create user by registering in client then obtain the token
        '''
        data = {'username': 'test_req_1', 'password': '1232'}

        response = self.client.post('/sign-up/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # get the Token
        response = self.client.post('/sign-in/', data)
        self.assertIsNotNone(response.data)

    def test_retrieve_user_data(self):
        '''
        test retrieve user data with all transactions
        '''
        response = self.client.get('/user/getUserData/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_transactions_data_from_admin_account(self):
        '''
        test retrieve users data from admin account
        '''
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.tokenAdmin.key)
        response = self.client.get('/admin/transactions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_users_data_from_admin_account(self):
        '''
        test retrieve users data from admin account
        '''
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.tokenAdmin.key)
        response = self.client.get('/admin/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_deposit_on_user_account(self):
        '''
        deposit on user account with client API
        '''
        data = { "quantity": 300 , "receiver": None}
        response = self.client.post(f'/user/{self.user1.id}/deposit/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_withdraw_user_account(self):
        '''
        withdraw on user account with client API
        '''
        self.user1.deposit(400)
        data = { "quantity": 300 }
        response = self.client.post(f'/user/{self.user1.id}/withdraw/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
