from rest_framework import serializers

from .models import Employee
from accounts.models import User


class EmployeeSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    role = serializers.ChoiceField(
        choices=User.Roles.choices,
        write_only=True
    )

    days_employed = serializers.ReadOnlyField()

    class Meta:
        model = Employee
        fields = [
            'id',
            'name',
            'email',
            'password',
            'role',
            'mobile',
            'address',
            'title',
            'hire_date',
            'is_active',
            'company',
            'department',
            'days_employed'
        ]

    def validate_email(self, value):

        if User.objects.filter(
            email=value
        ).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate(self, attrs):

        company = attrs.get("company")
        department = attrs.get("department")

        if department.company_id != company.id:
            raise serializers.ValidationError(
                {
                    "department":
                    "This department does not belong to the selected company."
                }
            )

        return attrs

    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        role = validated_data.pop(
            "role"
        )

        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=password,
            role=role
        )

        employee = Employee.objects.create(
            user=user,
            **validated_data
        )

        return employee

    def update(
        self,
        instance,
        validated_data
    ):

        validated_data.pop(
            "password",
            None
        )

        validated_data.pop(
            "role",
            None
        )

        return super().update(
            instance,
            validated_data
        )