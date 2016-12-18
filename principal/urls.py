from django.conf.urls import url
from principal import views

urlpatterns=[
	url(r'^$',views.principal_index,name='indice'),
]