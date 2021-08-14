from rest_framework import serializers
from .models import CombinedJoke, Joke

class JokeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joke
        fields = ('body', 'created', 'lang')


class CombinedJokeSerializer(serializers.ModelSerializer):
    body = serializers.ReadOnlyField()
    source = JokeSerializer(read_only=True)
    destination = JokeSerializer(read_only=True)

    class Meta:
        model = CombinedJoke
        fields = ('body', 'upvotes', 'downvotes', 'source', 'destination')