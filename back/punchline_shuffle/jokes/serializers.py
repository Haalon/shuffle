from rest_framework import serializers
from .models import CombinedJoke, Joke

class JokeSerializer(serializers.ModelSerializer):
    punchline = serializers.ReadOnlyField()
    class Meta:
        model = Joke
        fields = ('body', 'created', 'lang', 'punchline')


class CombinedJokeSerializer(serializers.ModelSerializer):
    corrected_punchline = serializers.ReadOnlyField()
    body = serializers.ReadOnlyField()
    source = JokeSerializer(read_only=True)
    destination = JokeSerializer(read_only=True)

    class Meta:
        model = CombinedJoke
        fields = ('pk', 'body', 'corrected_punchline', 'upvotes', 'downvotes', 'source', 'destination')