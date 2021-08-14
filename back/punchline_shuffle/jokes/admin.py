from django.contrib import admin
from jokes.models import Joke, CombinedJoke

admin.site.register(Joke)
admin.site.register(CombinedJoke)
# Register your models here.
