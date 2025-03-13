from django.contrib import admin
from .models import User, Chapter, Lesson, Question, AnswerOption, UserProgress

# Register your models here.
admin.site.register(User)
admin.site.register(Chapter)
admin.site.register(Lesson)
admin.site.register(Question)
admin.site.register(AnswerOption)
admin.site.register(UserProgress)
