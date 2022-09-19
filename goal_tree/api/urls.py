from rest_framework import routers
from .views import TreeListView, TreeView

router = routers.DefaultRouter()
router.register('api/trees', TreeListView, 'trees')
router.register('api/trees/<str:treeId>/<str:treeTitle>', TreeView, 'tree')

urlpatterns = router.urls
