from django.urls import path
from booking import views 
from django.conf.urls import url
 
urlpatterns = [ 
	path('', views.get_pocetna_stranica),
    path('destinacije/', views.get_destinacije), #ovde bi bio localhost:8000/destinacije/ iz angulara 
    path('login/', views.login),
    path('registracija/', views.registracija),
    path('korisnici/', views.korisnik_all),
    path('smestajall/', views.smestaj_all),
    path('rezervacija/', views.create_rezervacija),
    url(r'^rezervacije/(?P<korisnik_id>\d+)/$', views.moje_rezervacije),
    path('novSmestaj/', views.create_smestaj),
    url(r'^get-smestaj/(?P<smestaj_id>\d+)/$', views.get_smestaj),
    url(r'^get-profil/(?P<korisnik_id>\d+)/$', views.get_profil),
    path('add-osoba/', views.add_osoba),
    path('oceni/', views.oceni),
    path('ocena-all/', views.ocena_all),
    url(r'^otkazi-rez/(?P<rez_id>\d+)/$', views.otkazi_rez),
    path('rezervacije-all/', views.rez_all),
    url(r'^moji-smestaji/(?P<korisnik_id>\d+)/$', views.moji_smestaji),
]
