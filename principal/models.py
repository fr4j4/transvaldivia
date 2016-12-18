from django.db import models
# Create your models here.
class linea(models.Model):
	nombre = models.CharField(max_length=200)
	color=models.CharField(max_length=20)

class recorrido(models.Model):
	nombre= models.CharField(max_length=200)
	mapa=models.CharField(max_length=200)
	horario_inicio=models.TimeField(auto_now=False, auto_now_add=False)
	horario_final=models.TimeField(auto_now=False, auto_now_add=False)

class tipo_vehiculo(models.Model):
	nombre=models.CharField(max_length=200)
	class Meta:
		verbose_name='tipo_vehiculo'
		verbose_name_plural='tipos de vehiculo'
	def __str__(self):
		return self.tipo_vehiculo

class paradero(models.Model):
	nombre=models.CharField(max_length=200)
	latitud=models.FloatField()
	longitud=models.FloatField()


