from rest_framework import generics
from .models import *
from .serializers import *

class JobListAPIView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class ApplicantViewSet(generics.ListCreateAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    def create(self, request, *args, **kwargs):
       
        resume_file = request.data.get('resume')

        if resume_file:
            
            request.data.pop('resume', None)

          
            request.data['resume'] = resume_file

    
        return super().create(request, *args, **kwargs)


class ApplicantCreateAPIView(generics.CreateAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def perform_create(self, serializer):
        job_id = self.request.data.get('job_id')
        job = Job.objects.get(id=job_id)
        serializer.save(user=self.request.user, job=job)


class ApplicantDetailAPIView(generics.RetrieveAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

class DepartmentViewSet(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer