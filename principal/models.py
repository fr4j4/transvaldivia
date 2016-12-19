from django.db import models

from geoposition.fields import GeopositionField#gmaps

# Create your models here.
class tipo_vehiculo(models.Model):
	nombre=models.CharField(max_length=200)
	class Meta:
		verbose_name='tipo de vehiculo'
		verbose_name_plural='tipos de vehiculo'
	def __str__(self):
		return self.tipo_vehiculo

class paradero(models.Model):
	nombre=models.CharField(max_length=200)
	pos = GeopositionField()
	#latitud=models.FloatField()
	#longitud=models.FloatField()
	def __str__(self):
		return self.nombre

class recorrido(models.Model):
	nombre= models.CharField(max_length=200)
	mapa=models.CharField(max_length=200)
	horario_inicio=models.TimeField(auto_now=False, auto_now_add=False)
	horario_final=models.TimeField(auto_now=False, auto_now_add=False)
	def __str__(self):
		return self.nombre
	#paradero=models.ManyToManyField(paradero)

class linea(models.Model):
	nombre = models.CharField(max_length=200)
	color=models.CharField(max_length=20)
	tipo_vehiculo=models.ForeignKey(tipo_vehiculo,null=False)
	recorrido = models.ManyToManyField(recorrido)


class recorrido_paradero(models.Model):
	recorrido=models.ForeignKey(recorrido, on_delete=models.CASCADE)
	paradero=models.ForeignKey(paradero, on_delete=models.CASCADE)
	pos= models.IntegerField()






