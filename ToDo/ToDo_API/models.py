from django.db import models

from django.db import models


class TodoModel(models.Model):
    title = models.CharField(max_length=20)
    # description = models.TextField(max_length=100, blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    
    

    def __str__(self):
        return self.title

