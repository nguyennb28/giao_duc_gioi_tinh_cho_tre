from rest_framework import permissions


class IsRoleAdmin(permissions.BasePermission):
    """
    Cho phép truy cập nếu user đã được xác thực và có role là 'admin'
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "admin"
        )


class IsRoleStudent(permissions.BasePermission):
    """
    Cho phép truy cập nếu user đã được xác thực và có role là 'student'
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "student"
        )


class IsRoleTeacher(permissions.BasePermission):
    """
    Cho phép truy cập nếu user đã được xác thực và có role là 'teacher'
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "teacher"
        )
