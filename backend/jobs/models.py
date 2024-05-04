from django.db import models

# Create your models here.
from django.db import models
from users.models import CustomUser  
from cloudinary_storage.storage import MediaCloudinaryStorage

class Department(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name


class Job(models.Model):
    title = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    description = models.TextField()
    requirements = models.TextField()
    location = models.CharField(max_length=100)
    salary = models.CharField(max_length=100)
    image = models.ImageField(upload_to='jobs/', storage=MediaCloudinaryStorage, null=True, blank=True)
    start_date = models.DateField()
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Applicant(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=10)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')

    def __str__(self):
        return self.name


