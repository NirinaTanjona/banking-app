from django.urls import path
from django.contrib import admin
from rest_framework import routers
from api import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet, basename='user')


urlpatterns = router.urls

urlpatterns += [
    # path('admin/', admin.site.urls),
    path('sign-in/', obtain_auth_token), #gives us access to token auth
    path('sign-up/', views.UserRegister.as_view(), name='sign-up'),

]