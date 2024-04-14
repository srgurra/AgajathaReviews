# movies/urls.py

from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf import settings
from rest_framework_jwt.views import obtain_jwt_token
from oauth2_provider.views import (
    TokenView, 
    AuthorizationView,
    ApplicationRegistration,
    ApplicationDetail,
)
from django.contrib import admin
#from .views import react_login,home
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView
#from api.views import ObtainTokenPairView
from django.views.generic import TemplateView
from django.conf.urls.static import static

urlpatterns = [
    path('api/', include('api.urls')),
    #path('admin/', admin.site.urls),
    #path('oauth2/', include('oauth2.urls')),
    #path('accounts/login/', react_login, name='react_login'),
    #path('movies/', home, name='home'),
    #path('accounts/login/', auth_views.LoginView.as_view(), name='login')
    #path('', views.index, name='index'),
    #path('', TemplateView.as_view(template_name='index.html')),
    #path('api/token/', obtain_jwt_token),
    #path('accounts/login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    #path('', TemplateView.as_view(template_name='index.html'), name='index'),
    
    
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
