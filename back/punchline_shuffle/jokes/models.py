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

    def replace_punchline(self, new_punchline):
        return re.sub(r"{.*}(?s)", new_punchline, self.body)
    
    def __str__(self):
        return self.body


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

    class Meta:
        ordering = ['-upvotes']

    @property
    def corrected_punchline(self):
        punch = self.source.punchline
        if self.destination.capitalize:
            punch = punch[:1].upper() + punch[1:]
        else:
            punch = punch[:1].lower() + punch[1:]
        
        return punch

    @property
    def body(self):     
        return self.destination.replace_punchline(self.corrected_punchline)
    
    def __str__(self):
        return self.body

