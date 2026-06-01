from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from employees.filters import EmployeeFilter
from .models import Employee
from .serializers import EmployeeSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action

from accounts.permissions import IsAdmin, IsHRManager, IsAdminOrHR
from rest_framework.permissions import IsAuthenticated


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]
    
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter
    ]

    filterset_class = EmployeeFilter

    search_fields = [
        'name',
        'email',
        'mobile',
        'title',
        'department__name',
        'user__username'
    ]

    ordering_fields = [
        'id',
        'name',
        'hire_date'
    ]

    ordering = ['id']
    
    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        employee = Employee.objects.get(user=request.user)
        serializer = self.get_serializer(employee)
        return Response(serializer.data)