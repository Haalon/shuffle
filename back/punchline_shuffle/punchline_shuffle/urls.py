from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from jokes import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'jokes', views.JokeViewSet)
router.register(r'combined_jokes', views.CombinedJokeViewSet)

urlpatterns = [
    path('auth/', include('auth.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
