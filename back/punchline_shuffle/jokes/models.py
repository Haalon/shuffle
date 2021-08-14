from django.db import models
import re

class Joke(models.Model):
    class Language(models.TextChoices):
        ENGLISH = 'ENG', 'English'
        RUSSIAN = 'RU', 'Русский'

    body = models.TextField()
    created = models.DateTimeField(auto_now=True)

    use_as_source = models.BooleanField(
        default=True, 
        verbose_name="Use this joke as a punchline source")
    use_as_destination = models.BooleanField(
        default=True,
        verbose_name="Use this joke as a punchline destination")

    capitalize = models.BooleanField(
        default=True,
        verbose_name="Capitalize punchline when inserting a new one")

    lang = models.CharField(
        max_length=4,
        choices=Language.choices,
        default=Language.RUSSIAN)

    @property
    def punchline(self):
        return re.search(r"{(.*)}(?s)", self.body).group(1)


class CombinedJoke(models.Model):
    source = models.ForeignKey(
        Joke,
        on_delete=models.CASCADE, 
        related_name='combined_as_source')
    destination = models.ForeignKey(
        Joke,
        on_delete=models.CASCADE, 
        related_name='combined_as_destination')

    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
