from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"chapters", views.ChapterViewSet)
router.register(r"lessons", views.LessonViewSet)
router.register(r"questions", views.QuestionViewSet)
router.register(r"answer-options", views.AnswerOptionViewSet)
router.register(r"user-progress", views.UserProgressViewSet)

urlpatterns = [path("", include(router.urls))]
