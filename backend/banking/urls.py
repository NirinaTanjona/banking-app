from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from api import views
# from rest_framework.authtoken.views import obtain_auth_token

# user router
user_router = routers.DefaultRouter()
user_router.register(r'user', views.UserViewSet, basename='user')

# admin router
admin_router = routers.DefaultRouter()
admin_router.register(r'users', views.AdminUsersDataViewSet, basename='users')
admin_router.register(r'transactions', views.AdminTransactionDataViewSet, basename='transactions')


urlpatterns = [
    path('sign-in/', views.CustomAuthToken.as_view()), #gives us access to token auth
    path('sign-up/', views.UserRegister.as_view(), name='sign-up'),
    path('admin/', include(admin_router.urls)),
    path('', include(user_router.urls))
]