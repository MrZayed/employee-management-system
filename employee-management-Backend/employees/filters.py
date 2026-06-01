import django_filters
from .models import Employee


class EmployeeFilter(django_filters.FilterSet):
    class Meta:
        model = Employee
        fields = {
            'department': ['exact'],
            'is_active': ['exact'],
            'hire_date': ['gte', 'lte'],
        }