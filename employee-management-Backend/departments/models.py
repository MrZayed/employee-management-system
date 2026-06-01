from django.db import models
from companies.models import Company


class Department(models.Model):

    name = models.CharField(
        max_length=255
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="departments"
    )

    def __str__(self):
        return self.name