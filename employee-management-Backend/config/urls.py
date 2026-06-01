from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({"message": "Employee Management API is running"})


urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),

    # APIs
    path("api/", include("employees.urls")),
    path("api/", include("departments.urls")),
    path("api/", include("companies.urls")),

    # Auth
    path("api/auth/", include("accounts.urls")),
]