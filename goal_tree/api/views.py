from .serializers import TreeSerializer
from rest_framework import viewsets, permissions
from .models import Tree

# Create your views here.


class TreeListView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TreeSerializer

    def get_queryset(self):
        return self.request.user.trees.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TreeView(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TreeSerializer

    def get_queryset(self):
        query_set = self.request.user.trees.all()
        treeTitle = self.kwargs['treeTitle']
        print(treeTitle)
        if treeTitle is not None:
            query_set.filter(title=treeTitle)
        return query_set
    

    
