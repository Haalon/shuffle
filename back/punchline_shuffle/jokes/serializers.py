from rest_framework import serializers
from .models import CombinedJoke, Joke, PUNCHLINE_RE
import re

class JokeSerializer(serializers.ModelSerializer):
    punchline = serializers.ReadOnlyField()

    def validate_body(self, value):
        res = re.findall(PUNCHLINE_RE, value)
        if not res:
            raise serializers.ValidationError("Body should have highlighted punchline")
        if len(res) > 1:
            raise serializers.ValidationError("There can be only one punchline")
        if not res[0]:
            raise serializers.ValidationError("Highlighted punchline should not be empty")
        
        return value

    class Meta:
        model = Joke
        fields = ('pk', 'body', 'created', 'lang', 'punchline', 'use_as_source', 'use_as_destination')


class CombinedJokeSerializer(serializers.ModelSerializer):
    corrected_punchline = serializers.ReadOnlyField()
    body = serializers.ReadOnlyField()
    source = JokeSerializer(read_only=True)
    destination = JokeSerializer(read_only=True)

    class Meta:
        model = CombinedJoke
        fields = ('pk', 'body', 'corrected_punchline', 'upvotes', 'downvotes', 'source', 'destination')