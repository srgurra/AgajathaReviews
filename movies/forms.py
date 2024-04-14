# movies/forms.py
from django.forms import ModelForm, ModelChoiceField,CharField
from .models import Movie, MovieReview, MovieOtt, MovieCast, MovieLanguage

class MovieForm(ModelForm):
    class Meta:
        model = Movie
        fields = ('title', 'release_date', 'description', 'poster_url')

class ReviewForm(ModelForm):
    #movie = ModelChoiceField(queryset=Movie.objects.all(), to_field_name='title')
    #title = CharField(label='Title', max_length=255, required=True)
    movie = ModelChoiceField(label='Movie', queryset=Movie.objects.filter(title__isnull=False).distinct(), to_field_name='id', empty_label=None)
    class Meta:
        model = MovieReview
        fields = ('movie', 'review_text','pros','cons','conclusion','rating')

class MovieOttForm(ModelForm):
    movie = ModelChoiceField(label='Movie', queryset=Movie.objects.filter(title__isnull=False).distinct(), to_field_name='id', empty_label=None)
    class Meta:
        model = MovieOtt
        fields = ('movie', 'ott_name')

class MovieLanguageForm(ModelForm):
    movie = ModelChoiceField(label='Movie', queryset=Movie.objects.filter(title__isnull=False).distinct(), to_field_name='id', empty_label=None)
    class Meta:
        model = MovieLanguage
        fields = ('movie', 'language_name')
    
class MovieCastForm(ModelForm):
    movie = ModelChoiceField(label='Movie', queryset=Movie.objects.filter(title__isnull=False).distinct(), to_field_name='id', empty_label=None)
    class Meta:
        model = MovieCast
        fields = ('movie', 'hero', 'heroin', 'others')

        



