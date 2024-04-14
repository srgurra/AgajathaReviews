# movies/views.py

"""from django.shortcuts import render,redirect
from .models import Review
from .forms import ReviewForm

def review_list(request):
    reviews = Review.objects.all()
    return render(request, 'movies/review_list.html', {'reviews': reviews})

def review_create(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('review_list')
    else:
        form = ReviewForm()
    
    return render(request, 'movies/review_create.html', {'form': form})"""

"""from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Movie

def index(request):
    return render(request, 'index.html')

def home(request):
    return render(request, 'home.html')

class MovieListView(ListView):
    model = Movie
    template_name = 'movies/movie_list.html'

class MovieDetailView(DetailView):
    model = Movie
    template_name = 'movies/movie_detail.html'
"""
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import os
from django.conf import settings
from django.http import HttpResponse
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy

def index(request):
    try:
        with open(os.path.join(settings.BASE_DIR, 'static', 'index.html')) as file:
            return HttpResponse(file.read())
    except:
        return HttpResponse("Error loading index.html")
class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True
    success_url = reverse_lazy('writeadmin')

"""@csrf_exempt
def react_login(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password')
    return render(request, 'react_login.html')


def home(request):
    print("home")
    return render(request, 'home.html')

@login_required
@permission_classes([IsAuthenticated])
def writeadmin(request):
    print("home")
    return render(request, 'home.html')"""
