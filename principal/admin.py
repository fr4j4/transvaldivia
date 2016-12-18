from django.contrib import admin
from principal.models   import   linea
from principal.models   import   recorrido
from principal.models   import   tipo_vehiculo
from principal.models   import   paradero
# Register your models here.
admin.site.register(linea)
admin.site.register(recorrido)
admin.site.register(tipo_vehiculo)
admin.site.register(paradero) 

