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



    # try:
    #     customer = Customer.objects.get(pk=pk)
    # except Customer.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)

    # if request.method == 'GET':
    #     serializer = CustomerSerializer(customer,context={'request': request})
    #     return Response(serializer.data)

    # elif request.method == 'PUT':
    #     serializer = CustomerSerializer(customer, data=request.data,context={'request': request})
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method == 'DELETE':
    #     customer.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)