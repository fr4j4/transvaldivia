from django.http import HttpResponse,JsonResponse
from django.shortcuts import render,render_to_response
from django.template   import   RequestContext,   loader  
from principal.models import *
from geopy.distance import vincenty

from datetime import *
import json
from django.http import HttpResponse

#from django.template import RequestContext,loader
# Create your views here.
DISTANCE_FROM_USER=0.00125

def indice(request):
	return HttpResponse("Hola mundo. Este es el indice")


def principal_index(request):
	template='principal/index.html'
	context={}
	return render(request,template,context)


def linea_info(request,id):
	template='principal/linea.html'
	l=linea.objects.get(id=id)

	context={'id':id,'l':l,'r':l.recorrido.all()}
	return render(request,template,context)
	#return render_to_response(template, d,context_instance=RequestContext(request))

def linea_list(request):
	template='principal/lista_lineas.html'
	context={'lineas':linea.objects.all()}
	return render(request,template,context)

def API_linea_info(request,id):
	data={}
	l=linea.objects.get(id=id)
	data['nombre']=l.nombre
	rec=l.recorrido.all()
	c=0;
	for r in rec:
		data[c]=r.nombre
		c+=1
	return JsonResponse(data)
 


def nearby_stops(request,lat,lng):
	lat=float(lat)
	lng=float(lng)
	data={
		'summary':{
			'latitude':lat,
			'longitude':lng,
		}
	}
	data['items']={}
	paraderos=paradero.objects.all()
	count=0
	for p in paraderos:
		dist=vincenty((lat,lng),(p.pos.latitude,p.pos.longitude)).meters
		if(dist<200):
			data['items'][str(count)]={
				'nombre':p.nombre,
				'lat':p.pos.latitude,
				'lng':p.pos.longitude,
				'dist':dist,
			}
			count+=1
	data['summary']['time']=datetime.now()
	data['summary']['total']=count
	data['summary']['item_name_sing']='paradero'
	data['summary']['item_name_plu']='paraderos'
	data['summary']['dist_sing']='metro'
	data['summary']['dist_plu']='metros'
	return JsonResponse(data)
