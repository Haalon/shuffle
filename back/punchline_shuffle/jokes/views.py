from rest_framework.response import Response
from rest_framework.decorators import api_view, throttle_classes
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.throttling import AnonRateThrottle

from django.db.models import F

from .models import Joke, CombinedJoke
from .serializers import *

class OncePerDayAnonThrottle(AnonRateThrottle):
    rate = '1/day'

class JokeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer


class CombinedJokeViewSet(viewsets.ModelViewSet):
    queryset = CombinedJoke.objects.all()
    serializer_class = CombinedJokeSerializer

    @action(detail=False)
    def generate(self, request):
        lang = request.query_params.get('lang', 'RU')
        
        try:
            src = Joke.objects.filter(use_as_source=True, lang=lang).order_by('?')[0]
            dst = Joke.objects.filter(use_as_destination=True, lang=lang).order_by('?')[0]
            while src == dst:
                dst = Joke.objects.filter(use_as_destination=True, lang=lang).order_by('?')[0]
        except Exception:
            return Response("Unable to generate a joke", status=status.HTTP_501_NOT_IMPLEMENTED)

        
        combined = CombinedJoke.objects.filter(source=src, destination=dst)

        if len(combined) == 0:
            combined = CombinedJoke(source=src, destination=dst)
            combined.save()
        else:
            combined = combined[0]
        
        serializer = CombinedJokeSerializer(combined, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'], throttle_classes=[])
    def react(self, request, pk):
        if 'positive' not in request.data:
            return Response("No reaction type was supplied", status=status.HTTP_400_BAD_REQUEST)

        comb_joke = CombinedJoke.objects.get(pk=pk)
        # F expessions ensure there is no race conditions
        if request.data['positive']:
            comb_joke.upvotes = F('upvotes') + 1
        else:
            comb_joke.downvotes = F('downvotes') + 1
        
        comb_joke.save()
        comb_joke.refresh_from_db()

        serializer = CombinedJokeSerializer(comb_joke, context={'request': request})
        return Response(serializer.data)
