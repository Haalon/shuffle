from rest_framework.response import Response
from rest_framework.decorators import api_view, throttle_classes
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle

from django.db.models import F

from .models import Joke, CombinedJoke
from .serializers import *

class OncePerDayAnonThrottle(AnonRateThrottle):
    rate = '1/day'

@api_view(['PATCH'])
@throttle_classes([OncePerDayAnonThrottle])
def react(request, pk):
    if 'positive' not in request.query_params:
        return Response("No reaction type was supplied", status=status.HTTP_400_BAD_REQUEST)
    
    is_postive_rection = request.query_params['positive'] == 'true'

    comb_joke = CombinedJoke.objects.get(pk=pk)
    if is_postive_rection:
        comb_joke.upvotes = F('upvotes') + 1
    else:
        comb_joke.downvotes = F('downvotes') + 1
    
    comb_joke.save()
    comb_joke.refresh_from_db()

    serializer = CombinedJokeSerializer(comb_joke, context={'request': request})
    return Response(serializer.data)

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
