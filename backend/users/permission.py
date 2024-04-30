from rest_framework import permissions

class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and (user.role == 'ustomer' or request.user.is_staff)

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and (user.role == 'admin'or request.user.is_staff)


class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and (user.role == 'staff'or request.user.is_staff)
    
    