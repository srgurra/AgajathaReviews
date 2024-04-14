"""from django.contrib import admin
from .models import Movie, MovieOtt, MovieLanguage, MovieCast, MovieReview
from django.utils import timezone
from .forms import ReviewForm, MovieOttForm, MovieLanguageForm, MovieCastForm


class ReviewAdmin(admin.ModelAdmin):
    form = ReviewForm
    list_display = ('get_movie_title',  'rating', 'review_text')
    #list_filter = ('movie__title', 'rating')
    def get_movie_title(self, obj):
        return obj.movie.title
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "movie":
            kwargs["queryset"] = Movie.objects.all().order_by('title')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'genre', 'release_date', 'director', 'runtime_minutes')
    def save_model(self, request, obj, form, change):
        obj.updated_at = timezone.now()
        super().save_model(request, obj, form, change)
    def __str__(self):
        print("calling __str__()")
        return self.title

class MovieOTTAdmin(admin.ModelAdmin):
    form= MovieOttForm
    list_display = ('get_movie_title','ott_name')
    #list_filter = ('ott_name', 'movie_id__title')
    def get_movie_title(self, obj):
        return obj.movie.title

class MovieLanguageAdmin(admin.ModelAdmin):
    form= MovieLanguageForm
    list_display = ('get_movie_title', 'language_name')
    def get_movie_title(self, obj):
        return obj.movie.title
    #list_filter = ('language_name', 'movie_id__title')

class MovieCastAdmin(admin.ModelAdmin):
    form = MovieCastForm
    list_display = ('get_movie_title','hero', 'heroin', 'others' )
    #list_filter = ('hero', 'heroin', 'movie_id__title')
    def get_movie_title(self, obj):
        return obj.movie.title



admin.site.register(MovieReview,ReviewAdmin)
admin.site.register(Movie,MovieAdmin)
admin.site.register(MovieOtt,MovieOTTAdmin)
admin.site.register(MovieLanguage,MovieLanguageAdmin)
admin.site.register(MovieCast,MovieCastAdmin)

"""