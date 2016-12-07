from django.db import models

# Create your models here.
#las id se crean automaticamente
class linea(models.Model):
	nombre=models.CharField(max_length=200);#nombre de la linea de transportes
	color=models.CharField(max_length=20);#color en formato #RRGGBB

class recorrido(models.Model):
	nombre=models.CharField(max_length=100);#nombre del recorrido
	mapa=models.CharField(max_length=200);#ruta de la imagen del recorrido
	horario_inicio=models.TimeField(auto_now=False, auto_now_add=False);
	horario_fin=models.TimeField(auto_now=False, auto_now_add=False);

class paradero(models.Model):
	nombre=models.CharField(max_length=100);#algun nombre para mostrar
	latitud=models.FloatField();
	longitud=models.FloatField();

class tipo_vehiculo(models.Model):
	nombre=models.CharField(max_length=100);
