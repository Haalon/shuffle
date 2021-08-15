from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Joke, CombinedJoke
from .serializers import *

@api_view(['GET'])
def generate_joke(request):
    src = Joke.objects.filter(use_as_source=True).order_by('?')[0]
    dst = Joke.objects.filter(use_as_destination=True).order_by('?')[0]
    while src == dst:
        dst = Joke.objects.filter(use_as_destination=True).order_by('?')[0]
    
    combined = CombinedJoke.objects.filter(source=src, destination=dst)

    if len(combined) == 0:
        combined = CombinedJoke(source=src, destination=dst)
        combined.save()
    else:
        combined = combined[0]
    
    serializer = CombinedJokeSerializer(combined, context={'request': request})
    return Response(serializer.data)
