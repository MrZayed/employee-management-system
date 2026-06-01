from django.db import models
from companies.models import Company
from departments.models import Department
from accounts.models import User
from datetime import date


class Employee(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    company = models.ForeignKey(
    Company,
    on_delete=models.CASCADE,
    related_name="employees",
    null=False,
    blank=True
)

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="employees"
    )

    name = models.CharField(max_length=255)

    email = models.EmailField(
        unique=True
    )

    mobile = models.CharField(
        max_length=20
    )

    address = models.TextField()

    title = models.CharField(
        max_length=255
    )

    hire_date = models.DateField()

    is_active = models.BooleanField(
        default=True
    )

    @property
    def days_employed(self):
        return (
            date.today() - self.hire_date
        ).days

    def __str__(self):
        return self.name