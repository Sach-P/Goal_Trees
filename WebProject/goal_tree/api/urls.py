from rest_framework import routers
from .views import TreeListView

router = routers.DefaultRouter()
router.register('api/trees', TreeListView, 'trees')

urlpatterns = router.urls
