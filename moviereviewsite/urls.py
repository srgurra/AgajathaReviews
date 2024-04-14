# moviereviewsite/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView

""" urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('movies.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) """


urlpatterns = [
    path('', include('movies.urls')),
    #path('', include('api.urls')),
    #path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    #path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('', include ('authentication.urls')),
    #path('',TemplateView.as_view(name='index.html'))
    #path('api-auth/', include('rest_framework.urls')),
    #path('api/token/', obtain_auth_token, name='api-token'),

]