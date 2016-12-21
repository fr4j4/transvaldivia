from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
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
				'dis-sing':'metro',
				'dis-plu':'metros',
			}
			count+=1
	data['summary']['time']=datetime.now()
	return JsonResponse(data)
