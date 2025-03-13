from rest_framework import serializers
from .models import User, Chapter, Lesson, Question, AnswerOption, UserProgress
import re


class UserSerializer(serializers.ModelSerializer):

    # remove validator default
    phone = serializers.CharField(validators=[], max_length=10)

    class Meta:
        model = User
        fields = ["id", "username", "phone", "full_name", "role", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    # Check phone is unique
    def validate_phone(self, value):
        value = value.strip()
        if not re.fullmatch(r"\d{10}", value):
            raise serializers.ValidationError("Số điện thoại phải gồm đúng 10 chữ số")
        # Nếu update và số điện thoại không đổi, bỏ qua validation
        if self.instance and self.instance.phone == value:
            return value
        # Nếu tồn tại user khác với số điện thoại này, raise error
        if User.objects.filter(phone=value).exists():
            raise serializers.ValidationError(
                "Số điện thoại đã tồn tại, vui lòng sử dụng số khác."
            )
        return value


class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson
        fields = ["id", "chapter", "lesson_number", "title", "description", "video_url"]


class ChapterSerializer(serializers.ModelSerializer):

    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = ["id", "chapter_number", "name", "description", "lessons"]


class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerOption
        fields = ["id", "question", "answer_text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):

    answer_options = AnswerOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "lesson", "question_text", "question_type", "answer_options"]


class UserProgressSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProgress
        fields = [
            "id",
            "lesson",
            "is_completed",
            "quiz_score",
            "start_time",
            "end_time",
        ]
