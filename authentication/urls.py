from django.urls import path
from . import views
from django.urls import re_path


urlpatterns = [
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    #path('api-auth/login/', views.index, name='index'),
    #path('', views.index, name='index'),
    re_path(r'^.*$', views.index),
    
]
