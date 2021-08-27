from django.db import models
from django.contrib.auth.models import User
from treebeard.mp_tree import MP_Node

# Create your models here.


class Tree(models.Model):  # MP_Node):
    title = models.CharField(max_length=30, default='')
    description = models.TextField(default='')
    is_completed = models.BooleanField(default=False)
    owner = models.ForeignKey(
        User, related_name="trees", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    node_order_by = ['title']

    def __str__(self):
        return 'Tree: {}'.format(self.title)
