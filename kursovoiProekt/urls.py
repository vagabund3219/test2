
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('kursach.urls')),
    path('api/', include('kursach.API.apiurls')),
    path('users/', include('users.urls')),
    path('admin/', admin.site.urls),
]
