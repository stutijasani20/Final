from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.JobListAPIView.as_view(), name='job_list'),
    path('jobs/<int:pk>/', views.JobDetailAPIView.as_view(), name='job_detail'),
    path('applicant/', views.ApplicantViewSet.as_view(), name='job_detail'),
    path('applicant_create/', views.ApplicantCreateAPIView.as_view(), name='job_detail'),
    path('applicant/<int:pk>/', views.ApplicantViewSet.as_view(), name='job_detail'),
    path('department/', views.DepartmentViewSet.as_view(), name='department_detail'),
    path('department/<int:pk>/', views.DepartmentViewSet.as_view(), name='department_detail'),
]
