from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.exceptions import ValidationError


class User(AbstractUser):
    ROLE_CHOICES = [
        ("student", "Học sinh"),
        ("teacher", "Giáo viên"),
        ("admin", "Quản trị viên"),
    ]
    role = models.CharField(
        max_length=10, choices=ROLE_CHOICES, default="student", verbose_name="Vai trò"
    )
    phone = models.CharField(max_length=10, unique=True, verbose_name="Số điện thoại")
    full_name = models.CharField(max_length=150)
    is_verified = models.BooleanField(default=False, verbose_name="Đã xác minh")
    groups = models.ManyToManyField(
        Group,
        verbose_name="groups",
        blank=True,
        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
        related_name="api_user_groups",  # Đặt tên khác với mặc định
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name="user permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        related_name="api_user_permissions",  # Đặt tên khác với mặc định
        related_query_name="user",
    )

    class Meta:
        verbose_name = "Người dùng"
        verbose_name_plural = "Người dùng"

    def __str__(self):
        return f"{self.full_name}"


# Chương học
class Chapter(models.Model):
    chapter_number = models.IntegerField()
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["chapter_number"]

    def __str__(self):
        return f"Chương {self.chapter_number}: {self.name}"


# Bài giảng thuộc chương học
class Lesson(models.Model):
    chapter = models.ForeignKey(
        Chapter, on_delete=models.CASCADE, related_name="lessons"
    )
    lesson_number = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["lesson_number"]

    def __str__(self):
        return f"Bài {self.lesson_number}: {self.title}"


# Câu hỏi trắc nghiệm thuộc bài giảng
class Question(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="questions"
    )
    question_text = models.TextField()
    QUESTION_TYPE_CHOICES = (
        ("single_choice", "Single Choice"),
        ("multiple_choice", "Multiple Choice"),
    )
    question_type = models.CharField(
        max_length=50, choices=QUESTION_TYPE_CHOICES, default="single_choice"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Câu hỏi: {self.question_text[:50]}"

    def clean(self):
        super().clean()
        # Because question is foreign key of answer_options, but when question didn't created -> throw err
        # And now check if question is not created, don't check answer_options
        if not self.pk:
            return
        if self.question_type == "single_choice":
            correct_count = self.answer_options.filter(is_correct=True).count()
            if correct_count != 1:
                raise ValidationError(
                    "Câu hỏi kiểu lựa chọn đơn phải có đúng 1 đáp án đúng"
                )


class AnswerOption(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answer_options"
    )
    answer_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.answer_text + (" (Đúng)" if self.is_correct else "")


class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="progresses")
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="user_progress"
    )
    is_completed = models.BooleanField(default=False)
    quiz_score = models.FloatField(default=0)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "lesson")

    def __str__(self):
        status = "Hoàn thành " if self.is_completed else "Chưa hoàn thành"
        return f"Quá trình của {self.user} cho {self.lesson}: {status}"
