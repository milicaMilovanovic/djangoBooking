from django.shortcuts import render
from booking.serializers import *
from booking.models import *
from django.http import HttpResponse
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status
import json

# Create your views here.

# @csrf_exempt
def get_destinacije(request):
  if request.method == 'GET':
    destinacije = Destinacija.objects.all()
    destinacija_serializer = DestinacijaSerializer(destinacije, many=True)
    return JsonResponse(destinacija_serializer.data, safe=False)
  else:
  	return JsonResponse(destinacija_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

def get_pocetna_stranica(request):
	return HttpResponse('<h1> Ovo je pocetna stranica </h1>')

def korisnik_all(request):
  if request.method == 'GET':
    korisnici = Korisnik.objects.all()
    korisnik_serializer = KorisnikSerializer(korisnici, many=True)
    return JsonResponse(korisnik_serializer.data, safe=False)

@method_decorator(csrf_exempt)
def smestaj_all(request):
  if request.method == 'GET':
    smestaji = Smestaj.objects.all()
    smestaj_serializer = SmestajSerializer(smestaji, many=True)
    return JsonResponse(smestaj_serializer.data, safe=False)


# da probam sa id-om korisnika
@method_decorator(csrf_exempt)
def login(request):
  if request.method == 'POST':
    korisnik_data = JSONParser().parse(request) 
    korisnik_serializer = KorisnikSerializer(data=korisnik_data)
    if korisnik_serializer.is_valid():
      email = korisnik_serializer.data["email"]
      lozinka = korisnik_serializer.data["lozinka"]
      korisnikTrazeni = Korisnik.objects.filter(email=email).filter(lozinka=lozinka)  
      if korisnikTrazeni.exists():
        korisnikTrazeni_serializer = KorisnikSerializer(korisnikTrazeni.first(), many=False)
        return JsonResponse(korisnikTrazeni_serializer.data)
      else:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

        # if not queryset ako ne postoji
        #korisnikTrazeni.first()!!!!!!!!!!!!!

@method_decorator(csrf_exempt)
def add_osoba(request):
  if request.method == 'POST':
    osoba_data = JSONParser().parse(request)
    osoba_serializer = OsobaSerializer(data=osoba_data)
    if osoba_serializer.is_valid():

      datumrodjenja = osoba_serializer.data["datumrodjenja"]
      ime = osoba_serializer.data["ime"]
      prezime = osoba_serializer.data["prezime"]
      aboutme = osoba_serializer.data["aboutme"]

      osoba = Osoba.objects.create(datumrodjenja=datumrodjenja, ime=ime, prezime=prezime, aboutme=aboutme)
      osobaId = osoba.idosoba
      return JsonResponse(osobaId, safe=False)


@method_decorator(csrf_exempt)
def registracija(request):
  if request.method == 'POST':
    korisnik_data = request.body

    korisnikJson = json.loads(korisnik_data)
    email = korisnikJson['email']
    lozinka = korisnikJson['lozinka']
    idosoba = korisnikJson['idosoba']

    # provera da li postoji korisnik sa tim email-om
    korisniciEmail = Korisnik.objects.filter(email=email)
    if korisniciEmail.exists():
      return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    idOsobaObjekat = Osoba.objects.filter(idosoba=idosoba)  
    if idOsobaObjekat.exists():
      korisnik = Korisnik.objects.create(idosoba=idOsobaObjekat.first(), email=email, lozinka=lozinka)
      korisnik_serializer = KorisnikSerializer(korisnik, many=False)
      return JsonResponse(korisnik_serializer.data, safe=False)
  else:
    print("greska pri kreiranju korisnika")
    return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt)
def create_smestaj(request):
  if request.method == 'POST':
    smestaj_data = request.body

    smestajJson = json.loads(smestaj_data)
    iddestinacija = smestajJson['iddestinacija']
    brojsoba = smestajJson['brojsoba']
    opis = smestajJson['opis']
    brojkreveta = smestajJson['brojkreveta']
    cenanocenja = smestajJson['cenanocenja']
    naziv = smestajJson['naziv']
    idkorisnikvlasnik = smestajJson['idkorisnikvlasnik']

    # //ovde mozda proveriti jel postoji smestaj sa tim imenom
    smestajSaIstimNazivom = Smestaj.objects.filter(naziv__iexact=naziv)
    if smestajSaIstimNazivom.exists():
      return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    iddestinacijaObjekat = Destinacija.objects.filter(iddestinacija=iddestinacija)
    idkorisnikvlasnikObjekat = Korisnik.objects.filter(idkorisnik=idkorisnikvlasnik)

    if iddestinacijaObjekat.exists() and idkorisnikvlasnikObjekat.exists():
      smestaj = Smestaj.objects.create(iddestinacija=iddestinacijaObjekat.first(), idkorisnikvlasnik=idkorisnikvlasnikObjekat.first(), brojsoba=brojsoba, opis=opis, brojkreveta=brojkreveta, cenanocenja=cenanocenja, naziv=naziv)
      return HttpResponse(status=status.HTTP_200_OK)


@method_decorator(csrf_exempt)
def create_rezervacija(request):
  if request.method == 'POST':
    rezervacija_data = request.body

    rezervacijaJson = json.loads(rezervacija_data)
    idkorisnik = rezervacijaJson['idkorisnik']
    idsmestaj = rezervacijaJson['idsmestaj']
    datumprijave = rezervacijaJson['datumprijave']
    datumodjave = rezervacijaJson['datumodjave']
    cenarezervacije = rezervacijaJson['cenarezervacije']

    zauzeteRezervacijeIn = Rezervacija.objects.filter(idsmestaj=idsmestaj).filter(datumprijave__lte=datumodjave).filter(datumodjave__gte=datumprijave)

    if zauzeteRezervacijeIn.exists():
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    idkorisnikObjekat = Korisnik.objects.filter(idkorisnik=idkorisnik)
    idsmestajObjekat = Smestaj.objects.filter(idsmestaj=idsmestaj)
    if idkorisnikObjekat.exists() and idsmestajObjekat.exists():
      rezervacija = Rezervacija.objects.create(idkorisnik=idkorisnikObjekat.first(), idsmestaj=idsmestajObjekat.first(), datumprijave=datumprijave, datumodjave=datumodjave, cenarezervacije=cenarezervacije)
      return HttpResponse(status=status.HTTP_200_OK)



@method_decorator(csrf_exempt)
def oceni(request):
  if request.method == 'POST':
    ocena_data = request.body

    ocenaJson = json.loads(ocena_data)
    ocenaO = ocenaJson['ocena']
    komentar = ocenaJson['komentar']
    idrez = ocenaJson['idrez']

    rezervacija = Rezervacija.objects.filter(idrezervacija=idrez)
    if rezervacija.exists():
      ocena = Ocena.objects.create(ocena=ocenaO, komentar=komentar, idrez=rezervacija.first())
      return HttpResponse(status=status.HTTP_200_OK)


@method_decorator(csrf_exempt)
def moje_rezervacije(request, korisnik_id):
  if request.method == 'GET':
    rezervacije = Rezervacija.objects.filter(idkorisnik=korisnik_id)
    if rezervacije.exists():
      rezervacije_serializer = RezervacijaSerializer(rezervacije, many=True)
      return JsonResponse(rezervacije_serializer.data, safe=False)
  return HttpResponse(status=status.HTTP_200_OK) 


@method_decorator(csrf_exempt)
def get_smestaj(request, smestaj_id):
  if request.method == 'GET':
    smestaj = Smestaj.objects.filter(idsmestaj=smestaj_id)
    if smestaj.exists():
      smestaj_serializer = SmestajSerializer(smestaj.first(), many=False)
      return JsonResponse(smestaj_serializer.data)
  else:
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@method_decorator(csrf_exempt)
def get_profil(request, korisnik_id):
  if request.method == 'GET':
    korisnik = Korisnik.objects.filter(idkorisnik=korisnik_id)
    if korisnik.exists():
      korisnik_serializer = KorisnikSerializer(korisnik.first(), many=False)
      return JsonResponse(korisnik_serializer.data)
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@method_decorator(csrf_exempt)
def ocena_all(request):
  if request.method == 'GET':
    ocene = Ocena.objects.all()
    ocene_serializer = OcenaSerializer(ocene, many=True)
    return JsonResponse(ocene_serializer.data, safe=False)


@method_decorator(csrf_exempt)
def otkazi_rez(request, rez_id):
  if request.method == 'GET':
    Rezervacija.objects.filter(idrezervacija=rez_id).delete()
    return HttpResponse(status=status.HTTP_200_OK) 
  return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@method_decorator(csrf_exempt)
def rez_all(request):
  if request.method == 'GET':
    rez = Rezervacija.objects.all()
    if rez.exists():
      rez_serializer = RezervacijaSerializer(rez, many=True)
      return JsonResponse(rez_serializer.data, safe=False)
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)  

@method_decorator(csrf_exempt)
def moji_smestaji(request, korisnik_id):
  if request.method == 'GET':
    smestaji = Smestaj.objects.filter(idkorisnikvlasnik=korisnik_id)
    if smestaji.exists():
      smestaji_serializer = SmestajSerializer(smestaji, many=True)
      return JsonResponse(smestaji_serializer.data, safe=False)
  return HttpResponse(status=status.HTTP_204_NO_CONTENT)

