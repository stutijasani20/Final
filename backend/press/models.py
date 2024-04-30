from django.db import models

class PressRelease(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    publication_date = models.DateField()
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    tags = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='press_images/', null=True, blank=True)
    related_links = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
   
   
  
    
    def __str__(self):
        return self.title
