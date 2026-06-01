from rest_framework import serializers
from .models import Department


class DepartmentSerializer(
    serializers.ModelSerializer
):

    active_employees = serializers.IntegerField(
        read_only=True
    )

    class Meta:
        model = Department
        fields = [
            'id',
            'name',
            'company',
            'active_employees'
        ]