from rest_framework.viewsets import ModelViewSet
from django.db.models import Count

from .models import Company
from .serializers import CompanySerializer


class CompanyViewSet(ModelViewSet):

    queryset = Company.objects.annotate(
        total_departments=Count(
            'departments',
            distinct=True
        ),
        total_employees=Count(
            'employees',
            distinct=True
        )
    )

    serializer_class = CompanySerializer