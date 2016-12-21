from django.conf.urls import url
from principal import views

intorfloat_re = '(-?\d+(?:\.\d+)?)'

urlpatterns=[
	url(r'^$',views.principal_index,name='indice'),
	url(r'^API/nearby_stops/'+intorfloat_re+','+intorfloat_re+'$',views.nearby_stops),
]