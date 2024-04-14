from rest_framework import serializers
from .models import Movie, MovieCast, MovieLanguage, MovieOtt, MovieReview, WebSeries
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

"""class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
        return token
"""

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class MovieGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields =('genre', 'title', 'postercard_url')

class WebSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebSeries
        fields = '__all__'

class UniqueGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('title', 'poster_url', 'genre',)
class UniqueOTTSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieOtt
        fields = ('ott_name',)
class UniqueLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieLanguage
        fields = ('language_name',)

class MovieCastSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieCast
        fields = '__all__'

class MovieLanguageSerializer(serializers.ModelSerializer):
    movie_title = serializers.CharField(source='movie.title', read_only=True)
    postercard_url = serializers.CharField(source='movie.postercard_url', read_only=True)
    class Meta:
        model = MovieLanguage
        fields =('language_name', 'movie_title', 'postercard_url')

class MovieOttSerializer(serializers.ModelSerializer):
    movie_title = serializers.CharField(source='movie.title', read_only=True)
    postercard_url = serializers.CharField(source='movie.postercard_url', read_only=True)
    class Meta:
        model = MovieOtt
        fields = ('ott_name', 'movie_title', 'postercard_url')


class MovieReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieReview
        fields = '__all__'

class MovieDescriptionSerializer(serializers.ModelSerializer):
    #reviews = MovieReviewSerializer(many=True, read_only=True, source='moviereview_set')
    movie_reviews = MovieReviewSerializer(many=True, read_only=True, source='moviereview_set')

    class Meta:
        model = Movie
        fields =  '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Check if 'movie_reviews' key exists in data
        if 'movie_reviews' in data and data['movie_reviews']:
            # Flatten the movie data and review data into one dictionary
            movie_data = {
                key: data[key] for key in data if key != 'movie_reviews'
            }
            movie_review_data = data['movie_reviews'][0]  # Assuming only one review per movie
            movie_data.update(movie_review_data)
            return movie_data
        else:
            return data
