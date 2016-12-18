from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def indice(request):
	return HttpResponse("Hola mundo. Este es el indice")

def principal_index(request):
	return HttpResponse("Hola mundo. Este es el indice de principal")