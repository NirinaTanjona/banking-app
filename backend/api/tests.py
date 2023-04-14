from rest_framework.test import APITestCase
from api.models import User, Transaction

class BankingApiTestCase(APITestCase):
    """
    Test for Banking API
    """

    def setUp(self):

        self.user1 = User.objects.create_user(
            username='testuser1',
            password='this_is_a_test'
        )
        self.user2 = User.objects.create_user(
            username='testuser2',
            password='this_is_a_test'
        )
        self.admin = User.objects.create_superuser(
            username='admin',
            password='admin'
        )

    def test_users_role(self):
        '''
        test some users role (check if admin or user)
        '''
        self.assertEqual(self.user1.is_superuser, False)
        self.assertEqual(self.admin.is_superuser, True)
