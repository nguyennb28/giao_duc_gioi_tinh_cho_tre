from rest_framework import viewsets
from .models import User, Chapter, Lesson, Question, AnswerOption, UserProgress
from .serializers import (
    UserSerializer,
    ChapterSerializer,
    LessonSerializer,
    QuestionSerializer,
    AnswerOptionSerializer,
    UserProgressSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [IsAuthenticated]


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["get"])
    def by_chapter(self, request):
        chapter_id = request.query_params.get("chapter_id")
        if not chapter_id:
            return Response({"error": "Thiếu chapter_id"})

        lessons = Lesson.objects.filter(chapter_id=chapter_id).order_by("lesson_number")
        if not lessons:
            return Response({"detail": "Không tìm thấy lessons"})

        lesson_datas = lessons.values("id", "lesson_number")
        lesson_list = list(lesson_datas)
        return Response(
            {
                "chapter_id": chapter_id,
                "lesson": lesson_list,
                "quantity": lessons.count(),
            },
            status=status.HTTP_200_OK,
        )


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[IsAuthenticated],
        url_path="by_lesson/(?P<lesson_id>\d+)",
    )
    def lesson_questions(self, request, lesson_id=None):
        questions = self.get_queryset().filter(lesson_id=lesson_id)
        serializer = self.get_serializer(questions, many=True)
        return Response(serializer.data)


class AnswerOptionViewSet(viewsets.ModelViewSet):
    queryset = AnswerOption.objects.all()
    serializer_class = AnswerOptionSerializer
    permission_classes = [IsAuthenticated]


class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    def create(self, request, *args, **kwargs):
        lesson_id = request.data.get("lesson")
        if not lesson_id:
            return Response(
                {"error": "Thiếu lesson_id"}, status=status.HTTP_400_BAD_REQUEST
            )
        # query exist_progress
        exist_progress = self.get_queryset().filter(lesson_id=lesson_id).first()
        # check if exist_progress have and quiz_score
        if exist_progress and exist_progress.quiz_score == 100:
            return Response(
                {"detail": "Bạn đã hoàn thành bài học"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # get new score
        new_score = float(request.data.get("quiz_score"))

        # check if exist_progress have and compare new_score with old_score
        if exist_progress:
            if new_score > exist_progress.quiz_score:
                exist_progress.quiz_score = new_score
                exist_progress.is_completed = True if new_score == 100 else False
                exist_progress.save()
            serialzer = self.get_serializer(exist_progress)
            return Response(serialzer.data)

        # if exist_progress have not, create
        serialzer = self.get_serializer(data=request.data)
        serialzer.is_valid(raise_exception=True)
        serialzer.save(user=request.user)
        headres = self.get_success_headers(serialzer.data)
        return Response(serialzer.data, status=status.HTTP_201_CREATED, headers=headres)

    @action(detail=False, methods=["get"])
    def by_lesson(self, request):
        lesson_id = request.query_params.get("lesson_id")
        if not lesson_id:
            return Response({"error": "Thiếu lesson_id"}, status=400)
        progress = self.get_queryset().filter(lesson_id=lesson_id).first()
        if not progress:
            return Response({"detail": "Không tìm thấy"}, status=200)

        serializer = self.get_serializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def by_lessons(self, request):
        lesson_ids = request.query_params.getlist(
            "lesson_id"
        )  # Sửa .getList thành .getlist
        if not lesson_ids:
            return Response(
                {"error": "Không có dữ liệu"}, status=status.HTTP_400_BAD_REQUEST
            )

        progress_qs = UserProgress.objects.filter(lesson_id__in=lesson_ids)
        serializer = UserProgressSerializer(progress_qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
