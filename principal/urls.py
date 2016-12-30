from django.conf.urls import url
from principal import views

intorfloat_re = '(-?\d+(?:\.\d+)?)'

urlpatterns=[
	url(r'^$',views.principal_index,name='indice'),
	url(r'^linea/([0-9]+)$',views.linea_info,name='linea_info'),
	url(r'^lineas/',views.linea_list,name='lineas_list'),
	url(r'^API/nearby_stops/'+intorfloat_re+','+intorfloat_re+'$',views.nearby_stops),
	url(r'^API/line_details/([	0-9]+)$',views.API_linea_info,name="detalles_api"),
]