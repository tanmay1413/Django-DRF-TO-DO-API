from django.shortcuts import render

from rest_framework import generics 

from rest_framework.response import Response
from .models import TodoModel
from .serializers import ToDoSerializer




class ToDoListCreateAPIView(generics.ListCreateAPIView):
    queryset = TodoModel.objects.all()
    serializer_class = ToDoSerializer



class ToDoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoModel.objects.all()
    serializer_class = ToDoSerializer


