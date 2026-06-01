from rest_framework.viewsets import ModelViewSet
from django.db.models import Count, Q

from .models import Department
from .serializers import DepartmentSerializer


class DepartmentViewSet(ModelViewSet):

    queryset = Department.objects.annotate(
        active_employees=Count(
            'employees',
            filter=Q(
                employees__is_active=True
            )
        )
    )

    serializer_class = DepartmentSerializer