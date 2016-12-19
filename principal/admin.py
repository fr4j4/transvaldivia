from django.contrib import admin
from principal.models   import   linea
from principal.models   import   recorrido
from principal.models   import   tipo_vehiculo
from principal.models   import   paradero
from principal.models   import   recorrido_paradero

# Register your models here.

class recorrido_paraderoInline(admin.TabularInline):
	model=recorrido_paradero
	extra=1

class paraderoAdmin(admin.ModelAdmin):
	inlines=(recorrido_paraderoInline,)

class recorridoAdmin(admin.ModelAdmin):
	inlines=(recorrido_paraderoInline,)

admin.site.register(linea)
admin.site.register(recorrido, recorridoAdmin)
admin.site.register(tipo_vehiculo)
admin.site.register(paradero) 

