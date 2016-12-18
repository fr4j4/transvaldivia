from django.shortcuts import render
from django.http import HttpResponse
from principal.models import *
from django.template import RequestContext,loader
# Create your views here.
def indice(request):
	return HttpResponse("Hola mundo. Este es el indice")



def principal_index(request):
	template=loader.get_template('principal/index.html')  
	context=RequestContext(request)
	return HttpResponse(template.render(context))
	#return HttpResponse("Hola mundo. Este es el indice de principal")
