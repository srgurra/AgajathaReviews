from rest_framework import generics
from rest_framework.response import Response
from .models import Movie, MovieCast, MovieLanguage, MovieOtt, MovieReview, WebSeries
from .serializers import UniqueLanguageSerializer, MovieSerializer, MovieReviewSerializer, UniqueOTTSerializer,UniqueGenreSerializer, MovieOttSerializer, MovieLanguageSerializer, MovieCastSerializer, WebSeriesSerializer,MovieGenreSerializer, MovieDescriptionSerializer
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from datetime import datetime, timedelta
from django.db.models import Avg
import boto3
from botocore.exceptions import NoCredentialsError
from django.conf import settings
from io import BytesIO
from django.utils import timezone
from rest_framework import status
from django.db import models


@require_GET
def movie_suggestions(request):
    term = request.GET.get('term', '')
    suggestions = Movie.objects.filter(title__icontains=term).values_list('title', flat=True)
    return JsonResponse(list(suggestions), safe=False)
@require_GET
def webseries_suggestions(request):
    term = request.GET.get('term', '')
    suggestions = WebSeries.objects.filter(title__icontains=term).values_list('title', flat=True)
    return JsonResponse(list(suggestions), safe=False)


class WebSeriesUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = WebSeriesSerializer
    
    def put(self, request):
        title = request.data.get('title')
        try:
            webseries = WebSeries.objects.get(title=title)
        except WebSeries.DoesNotExist:
            webseries = WebSeries(title=title)
        if ('poster' or 'posterCard') in request.data:
            poster = request.data['poster']
            posterCard= request.data['posterCard']
            session = boto3.Session()
            s3 = session.client('s3')
            try:
                s3.upload_fileobj(poster, settings.AWS_STORAGE_BUCKET_NAME, f'media/webseries/posters/{title}.jpg')
                s3.upload_fileobj(posterCard, settings.AWS_STORAGE_BUCKET_NAME, f'media/webseries/postercards/{title}.jpg')
                movie.poster_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/webseries/posters/{title}.jpg'
                movie.postercard_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/webseries/postercards/{title}.jpg'
                request.data.pop('poster', None)
                request.data.pop('posterCard', None)
                request.data['poster_url'] = webseries.poster_url
                request.data['postercard_url'] = webseries.poster_url
            except NoCredentialsError:
                return Response({"error": "AWS credentials not available."}, status=500)
        serializer = self.serializer_class(webseries, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

"""
class MovieCastUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieCastSerializer

    def put(self, request):
        # Get the movie and cast parameters from the request data
        movie_title = request.data.get('movie')
        hero = request.data.get('hero')
        heroin = request.data.get('heroin')
        others = request.data.get('others')

        try:
            # Get the movie object based on the title
            movie = Movie.objects.get(title=movie_title)

            # Get the movie cast object based on the movie
            try:
                movie_cast = MovieCast.objects.get(movie=movie)
            except MovieCast.DoesNotExist:
                movie_cast = MovieCast(movie=movie)

            # Update the fields of the movie cast object
            movie_cast.hero = hero
            movie_cast.heroin = heroin
            movie_cast.others = others
            movie_cast.save()

            # Serialize the movie cast object and return a response
            serializer = self.serializer_class(movie_cast)
            return Response(serializer.data)

        except Movie.DoesNotExist:
            return Response({'error': 'Movie does not exist'}, status=400)"""


class MovieCastUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieCastSerializer

    def put(self, request):
        # Get the type, title, and cast parameters from the request data
        type = request.data.get('type')
        title = request.data.get('title')
        hero = request.data.get('hero')
        heroin = request.data.get('heroin')
        others = request.data.get('others')

        try:
            if type == "Movie":
                # Get the movie object based on the title from the Movie table
                movie = Movie.objects.get(title=title)

                # Get the movie cast object based on the movie from the MovieCast table
                try:
                    movie_cast = MovieCast.objects.get(movie=movie)
                except MovieCast.DoesNotExist:
                    movie_cast = MovieCast(movie=movie)
            elif type == "Web Series":
                # Get the movie object based on the title from the WebSeries table
                web_series = WebSeries.objects.get(title=title)

                # Get the movie cast object based on the web series from the MovieCast table
                try:
                    movie_cast = MovieCast.objects.get(web_series=web_series)
                except MovieCast.DoesNotExist:
                    movie_cast = MovieCast(web_series=web_series)
            else:
                return Response({'error': 'Invalid type'}, status=400)

            # Update the fields of the movie cast object
            movie_cast.hero = hero
            movie_cast.heroin = heroin
            movie_cast.others = others
            movie_cast.save()

            # Serialize the movie cast object and return a response
            serializer = self.serializer_class(movie_cast)
            return Response(serializer.data)

        except (Movie.DoesNotExist, WebSeries.DoesNotExist):
            return Response({'error': 'Movie or Web Series does not exist'}, status=400)


"""
class MovieLanguageUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieLanguageSerializer

    def put(self, request):
        # Get the movie and language parameters from the request data
        movie_title = request.data.get('movie')
        language_name = request.data.get('language_name')

        try:
            # Get the movie object based on the title
            movie = Movie.objects.get(title=movie_title)

            # Check if the movie language object already exists
            movie_language = MovieLanguage.objects.filter(movie=movie).first()

            if movie_language is None:
                # Create a new movie language object if it doesn't exist
                movie_language = MovieLanguage(movie=movie)

            # Update the fields of the movie language object
            movie_language.language_name = language_name
            movie_language.save()

            # Serialize the movie language object and return a response
            serializer = self.serializer_class(movie_language)
            return Response(serializer.data)

        except Movie.DoesNotExist:
            return Response({'error': 'Movie does not exist'}, status=400)

"""

class MovieLanguageUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieLanguageSerializer

    def put(self, request):
        # Get the type, title, and language parameters from the request data
        type = request.data.get('type')
        title = request.data.get('title')
        language_name = request.data.get('language_name')

        try:
            if type == "Movie":
                # Get the movie object based on the title from the Movie table
                movie = Movie.objects.get(title=title)

                # Check if the movie language object already exists
                movie_language = MovieLanguage.objects.filter(movie=movie).first()

                if movie_language is None:
                    # Create a new movie language object if it doesn't exist
                    movie_language = MovieLanguage(movie=movie)
            elif type == "Web Series":
                # Get the web series object based on the title from the WebSeries table
                web_series = WebSeries.objects.get(title=title)

                # Check if the web series language object already exists
                movie_language = MovieLanguage.objects.filter(web_series=web_series).first()

                if movie_language is None:
                    # Create a new web series language object if it doesn't exist
                    movie_language = MovieLanguage(web_series=web_series)
            else:
                return Response({'error': 'Invalid type'}, status=400)

            # Update the fields of the movie language object
            movie_language.language_name = language_name
            movie_language.save()

            # Serialize the movie language object and return a response
            serializer = self.serializer_class(movie_language)
            return Response(serializer.data)

        except (Movie.DoesNotExist, WebSeries.DoesNotExist):
            return Response({'error': 'Movie or Web Series does not exist'}, status=400)


"""
class MovieOttUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieOttSerializer

    def put(self, request):
        # Get the movie and ott_name parameters from the request data
        movie_title = request.data.get('movie')
        ott_name = request.data.get('ott_name')

        try:
            # Get the movie object based on the title
            movie = Movie.objects.get(title=movie_title)

            # Get or create the movie ott object based on the movie
            movie_ott, _ = MovieOtt.objects.get_or_create(movie=movie)

            # Update the fields of the movie ott object
            movie_ott.ott_name = ott_name
            movie_ott.save()

            # Serialize the movie ott object and return a response
            serializer = self.serializer_class(movie_ott)
            return Response(serializer.data)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie does not exist'}, status=400)

"""

class MovieOttUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieOttSerializer

    def put(self, request):
        # Get the type, title, and ott_name parameters from the request data
        contenttype = request.data.get('type')
        title = request.data.get('title')
        ott_name = request.data.get('ott_name')
        try:
            if contenttype == "Movie":
                # Get the movie object based on the title from the Movie table
                movie = Movie.objects.get(title=title)
                # Get or create the movie ott object based on the movie
                movie_ott, _ = MovieOtt.objects.get_or_create(movie=movie)
            elif contenttype == "Web Series":
                # Get the web series object based on the title from the WebSeries table
                web_series = WebSeries.objects.get(title=title)

                # Get or create the movie ott object based on the web series
                movie_ott, _ = MovieOtt.objects.get_or_create(web_series=web_series)
            else:
                return Response({'error': 'Invalid type'}, status=400)

            # Update the fields of the movie ott object
            movie_ott.ott_name = ott_name
            movie_ott.save()

            # Serialize the movie ott object and return a response
            serializer = self.serializer_class(movie_ott)
            return Response(serializer.data)
        except (Movie.DoesNotExist, WebSeries.DoesNotExist):
            return Response({'error': 'Movie or Web Series does not exist'}, status=400)

class UniqueOttPosterAPIView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UniqueOTTSerializer
    queryset = MovieOtt.objects.all()

    def get(self, request, *args, **kwargs):
        unique_ott_names = MovieOtt.objects.values_list('ott_name', flat=True).distinct().exclude(ott_name='')
        return Response(list(unique_ott_names))
        #return Response(serializer.data)

class UniqueLanguagePosterAPIView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UniqueLanguageSerializer
    queryset = MovieLanguage.objects.all()

    def list(self, request, *args, **kwargs):
        unique_language_names = MovieLanguage.objects.values_list('language_name', flat=True).distinct().exclude(language_name='')
        return Response(list(unique_language_names))

class UniqueGenrePosterAPIView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UniqueGenreSerializer

    def get(self, request, *args, **kwargs):
        unique_genre_names = Movie.objects.values_list('genre', flat=True).distinct().exclude(genre='')
        genres = set()  # Using a set to ensure unique genres
        
        for genre in unique_genre_names:
            genre_list = genre.split(', ')
            genres.update(genre_list)  # Add individual genres to the set

        return Response(list(genres))

class MovieByOTTAPIView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieOttSerializer

    def get_queryset(self):
        ott_names = self.request.query_params.getlist('ott')
        if ott_names != ['All']:
            queryset = MovieOtt.objects.filter(ott_name__in=ott_names)
        else:
            queryset = MovieOtt.objects.all()
        return queryset
        

class MovieOttList(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = MovieOtt.objects.all()
    serializer_class = MovieOttSerializer
    
class MovieByLanguageAPIView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieLanguageSerializer

    def get_queryset(self):
        language_names = self.request.query_params.getlist('languages')
        if language_names != ['all']:
            queryset =  MovieLanguage.objects.filter(language_name__in=language_names)
        else:
            queryset = MovieLanguage.objects.all()
        return queryset


class GetMovieDescription(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieDescriptionSerializer

    def get_queryset(self):
        title = self.request.query_params.getlist('movie_title')
        movies = Movie.objects.filter(title__in=title)
        movies = movies.prefetch_related('moviereview_set')
        return movies

class MovieByGenreAPIView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieGenreSerializer

    def get_queryset(self):
        genre_substring = self.request.query_params.get('genre', '').strip()
        if genre_substring != "all":
            genre_substrings = genre_substring.split(',')
            # Use __contains to filter movies with genres containing any of the substrings
            queryset = Movie.objects.filter(genre__contains=genre_substrings[0])
            for substring in genre_substrings[1:]:
                queryset = queryset | Movie.objects.filter(genre__contains=substring)
        else:
            queryset = Movie.objects.all()
        return queryset


"""     def list(self, request, *args, **kwargs):
        unique_genre_names = Movie.objects.values('genre').distinct()
        movies = []
        for genre in unique_genre_names:
            if latest_movie:
                language_poster = MovieLanguage.objects.filter(movie=latest_movie, language_name=language_name['language_name']).first()
                movies.append(language_poster)
        serializer = self.get_serializer(movies, many=True)
        return Response(serializer.data) """

""" class MovieReviewUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieReviewSerializer

    def put(self, request):
        # Get the movie parameter from the request data
        movie_title = request.data.get('movie')

        try:
            # Get the movie object based on the title
            movie = Movie.objects.get(title=movie_title)

            # Get or create the movie review object based on the movie
            movie_review, created = MovieReview.objects.get_or_create(movie=movie)

            if not created:
                # Update the fields of the movie review object
                serializer = self.serializer_class(movie_review, data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()

            # Serialize the movie review object and return a response
            serializer = self.serializer_class(movie_review)
            return Response(serializer.data)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie does not exist'}, status=400) """


"""
class MovieReviewUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieReviewSerializer
    queryset = MovieReview.objects.all()

    def update(self, request, *args, **kwargs):
        movie_title = request.data.get('movie')

        try:
            # Retrieve the Movie instance based on the title
            movie = Movie.objects.get(title=movie_title)

            # Create or update the MovieReview object
            movie_review, created = MovieReview.objects.update_or_create(
                movie=movie,
                defaults={
                    'rating': request.data.get('rating'),
                    'review_text': request.data.get('review_text'),
                    'pros': request.data.get('pros'),
                    'cons': request.data.get('cons'),
                    'conclusion': request.data.get('conclusion'),
                }
            )

            serializer = self.get_serializer(movie_review)
            return Response(serializer.data)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie does not exist'}, status=400)"""

class MovieUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieSerializer
    
    
    def put(self, request):
        # Get the title from the request data
        title = request.data.get('title')


        try:
            # Check if a movie with the given title exists
            movie = Movie.objects.get(title=title)
        except Movie.DoesNotExist:
            # Create a new movie object if it doesn't exist
            movie = Movie(title=title)

        if ('poster' or 'posterCard') in request.data:
            poster = request.data['poster']
            posterCard= request.data['posterCard']
            #s3 = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY, aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            session = boto3.Session()
            s3 = session.client('s3')
            try:
                s3.upload_fileobj(poster, settings.AWS_STORAGE_BUCKET_NAME, f'media/movies/{title}/poster.jpg')
                s3.upload_fileobj(posterCard, settings.AWS_STORAGE_BUCKET_NAME, f'media/movies/{title}/postercard.jpg')
                movie.poster_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/movies/{title}/poster.jpg'
                movie.postercard_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/movies/{title}/postercard.jpg'
                request.data.pop('poster', None)
                request.data.pop('posterCard', None)
                request.data['poster_url'] = movie.poster_url
                request.data['postercard_url'] = movie.postercard_url
            except NoCredentialsError:
                return Response({"error": "AWS credentials not available."}, status=500)

        # Update the fields of the movie object
        serializer = self.serializer_class(movie, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class MovieReviewUpdate(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MovieReviewSerializer

    def update(self, request, *args, **kwargs):
        title = request.data.get('title')
        type = request.data.get('type')
        try:
            if type == "Movie":
                # Retrieve the Movie instance based on the title from the Movie table
                movie = Movie.objects.get(title=title)
            elif type == "Web Series":
                # Retrieve the WebSeries instance based on the title from the WebSeries table
                movie = WebSeries.objects.get(title=title)
            else:
                return Response({'error': 'Invalid type'}, status=400)

            modified_data = request.data.copy()

            if ('review_text' or 'pros' or 'cons' or 'conclusion') in request.data:
                review_text= modified_data.get('review_text')
                pros= modified_data.get('pros')
                cons= modified_data.get('cons')
                conclusion= modified_data.get('conclusion')
                review_text_bytes = review_text.encode('utf-8')
                review_text_stream = BytesIO(review_text_bytes)
                pros_bytes = pros.encode('utf-8')
                pros_stream = BytesIO(pros_bytes)
                cons_bytes = cons.encode('utf-8')
                cons_stream = BytesIO(cons_bytes)
                conclusion_bytes = conclusion.encode('utf-8')
                conclusion_stream = BytesIO(conclusion_bytes)

                session = boto3.Session()
                s3 = session.client('s3')
                try:
                    s3.upload_fileobj(review_text_stream, settings.AWS_STORAGE_BUCKET_NAME, f'media/movies/{title}/review_text.txt')
                    s3.upload_fileobj(pros_stream, settings.AWS_STORAGE_BUCKET_NAME, f'media/movies/{title}/pros.txt')
                    s3.upload_fileobj(cons_stream, settings.AWS_STORAGE_BUCKET_NAME, f'media/movies/{title}/cons.txt')
                    s3.upload_fileobj(conclusion_stream, settings.AWS_STORAGE_BUCKET_NAME, f'media/movies/{title}/conclusion.txt')
                    movie.review_text_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/movies/{title}/review_text.txt'
                    movie.pros_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/movies/{title}/pros.txt'
                    movie.cons_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/movies/{title}/cons.txt'
                    movie.conclusion_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/movies/{title}/conclusion.txt'

                    modified_data['review_text'] = movie.review_text_url
                    modified_data['pros'] = movie.pros_url
                    modified_data['cons'] = movie.cons_url
                    modified_data['conclusion'] = movie.conclusion_url
                except NoCredentialsError:
                    return Response({"error": "AWS credentials not available."}, status=500)
            # Create or update the MovieReview object
            movie_review, created = MovieReview.objects.update_or_create(
                movie=movie,
                defaults={
                    'rating': modified_data.get('rating'),
                    'review_text': modified_data.get('review_text'),
                    'pros': modified_data.get('pros'),
                    'cons': modified_data.get('cons'),
                    'conclusion':modified_data.get('conclusion'),
                }
            )

            serializer = self.get_serializer(movie_review)
            return Response(serializer.data)
        except (Movie.DoesNotExist, WebSeries.DoesNotExist):
            return Response({'error': 'Movie or Web Series does not exist'}, status=400)
class MovieList(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MovieCastList(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = MovieCast.objects.all()
    serializer_class = MovieCastSerializer

class MovieLanguageList(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = MovieLanguage.objects.all()
    serializer_class = MovieLanguageSerializer

class MovieGenreList(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = Movie.objects.all()
    serializer_class = MovieGenreSerializer



class MovieReviewList(generics.ListAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = MovieReview.objects.all()
    serializer_class = MovieReviewSerializer

"""class LatestMovies(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        print("latest movies api called")
        movies = Movie.objects.order_by('-release_date')[:15]
        #data = [{'name': movie.title, 'release_date': movie.release_date} for movie in movies]
        print("latest movies"+ str(Response(serializer.data)))
        serializer = self.get_serializer(movies, many=True)
        return Response(serializer.data)"""



class LatestMovies(APIView):
    authentication_classes = []  # You can add authentication classes here if needed
    permission_classes = []  # You can add permission classes here if needed
    
    def get(self, request):
        print("Latest movies API called")
        
        # Fetch the top 15 movies ordered by release date in descending order
        movies = Movie.objects.order_by('-release_date')[:15]
        
        # Initialize an empty list to store the movie data with ratings
        movies_with_ratings = []

        # Iterate over the movies and get their ratings from MovieReview
        for movie in movies:
            try:
                # Get the latest review for the movie
                latest_review = MovieReview.objects.filter(movie=movie).latest('created_at')
                rating = latest_review.rating
            except MovieReview.DoesNotExist:
                # If there are no reviews, set rating to None
                rating = None

            # Create a dictionary with movie name, postercard URL, and rating
            movie_data = {
                'title': movie.title,
                'postercard_url': movie.postercard_url,
                'rating': rating,
            }

            movies_with_ratings.append(movie_data)

        serializer = MovieSerializer(movies, many=True)
        return Response(movies_with_ratings)

class GetReviewersFavs(APIView):
    authentication_classes = []  # You can add authentication classes here if needed
    permission_classes = []  # You can add permission classes here if needed
    
    def get(self, request):
        print("Top rated movies API called")
        
        # Calculate the date 60 days ago from the current date
        sixty_days_ago = timezone.now() - timezone.timedelta(days=60)
        
        # Fetch the top 15 movies with the highest ratings from the past 60 days
        top_rated_movies = (
            Movie.objects
            .filter(release_date__gte=sixty_days_ago)
            .annotate(avg_rating=models.Avg('moviereview__rating'))
            .order_by('-avg_rating')[:15]
        )
        
        # Serialize only the required fields: postercard_url, rating, and title
        movie_data = []
        for movie in top_rated_movies:
            movie_data.append({
                'postercard_url': movie.postercard_url,
                'rating': movie.avg_rating,  # Use the calculated average rating
                'title': movie.title,
            })
        
        return Response(movie_data, status=status.HTTP_200_OK)

class GetAudienceFavs(APIView):
    authentication_classes = []  # You can add authentication classes here if needed
    permission_classes = []  # You can add permission classes here if needed
    
    def get(self, request):
        print("Latest movies API called")
        
        # Fetch the top 15 movies ordered by release date in descending order
        movies = Movie.objects.order_by('-release_date')[:15]
        
        # Initialize an empty list to store the movie data with ratings
        movies_with_ratings = []

        # Iterate over the movies and get their ratings from MovieReview
        for movie in movies:
            try:
                # Get the latest review for the movie
                latest_review = MovieReview.objects.filter(movie=movie).latest('created_at')
                rating = latest_review.rating
            except MovieReview.DoesNotExist:
                # If there are no reviews, set rating to None
                rating = None

            # Create a dictionary with movie name, postercard URL, and rating
            movie_data = {
                'title': movie.title,
                'postercard_url': movie.postercard_url,
                'rating': rating,
            }

            movies_with_ratings.append(movie_data)

        serializer = MovieSerializer(movies, many=True)
        return Response(movies_with_ratings)


class FromThisWeekMoviesAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        current_date = datetime.now()
        one_week_ago = current_date - timedelta(days=7)
        movies = Movie.objects.filter(release_date__gte=one_week_ago)
        
        while not movies.exists() and one_week_ago <= current_date:
            one_week_ago -= timedelta(days=7)
            movies = Movie.objects.filter(release_date__gte=one_week_ago)
        
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

class TopRatedMoviesAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        one_month_ago = datetime.now() - timedelta(days=30)
        top_movies = (
            MovieReview.objects.filter(created_at__gte=one_month_ago)
            .values('movie')
            .annotate(avg_rating=Avg('rating'))
            .order_by('-avg_rating')[:3]
        )
        movie_ids = [movie['movie'] for movie in top_movies]
        top_movies_queryset = Movie.objects.filter(pk__in=movie_ids)
        serializer = MovieSerializer(top_movies_queryset, many=True)
        return Response(serializer.data)


