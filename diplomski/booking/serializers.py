from rest_framework import serializers 
from booking.models import *

class DestinacijaSerializer(serializers.ModelSerializer):
     class Meta:
        model = Destinacija
        fields = ('iddestinacija',
                  'drzava',
                  'grad')


class KorisnikSerializer(serializers.ModelSerializer):
    # osoba = OsobaSerializer(many=False, required=False)
    class Meta:
        model = Korisnik
        depth = 1
        fields = ('idkorisnik',
                  'idosoba',
                  'email', 
                  'lozinka')
                   # 'osoba')
    # def create(self, validated_data):
    #     print("create u serializatoru")
    #     # customer_serializer = CustomerSerializer(validated_data.get('customer'))
    #     # customer_serializer.save()
    #     print(validated_data)
    #     osoba_data_serializer = OsobaSerializer(data=validated_data.get('idosoba'))
    #     if osoba_data_serializer.is_valid():
    #         osoba_data_serializer.save()
    #         print(osoba_data_serializer)
    #     # Osoba.objects.create(**osoba_data)
    #     korisnik = Korisnik.objects.create(idosoba=osoba_data_serializer, **validated_data)
    #     return korisnik


class OsobaSerializer(serializers.ModelSerializer):
    # idosoba = serializers.ReadOnlyField()
    class Meta: 
        model = Osoba 
        fields = ('idosoba',
                  'datumrodjenja', 
                  'ime', 
                  'prezime', 
                  'aboutme')


class RezervacijaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezervacija
        depth = 1
        fields = ('idrezervacija',
                  'idkorisnik',
                  'idsmestaj',
                  'datumprijave',
                  'datumodjave',
                  'cenarezervacije')


class OcenaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ocena
        fields = ('idocena',
                  'ocena', 
                  'komentar',
                  'idrez')



class RezsListingField(serializers.RelatedField):
    def to_representation(self, value):
        return '%d' % (value.idrezervacija)


class SmestajSerializer(serializers.ModelSerializer):
    rezs = RezsListingField(many=True, read_only=True, required=False)
    class Meta:
        model = Smestaj
        depth = 1
        fields = ('idsmestaj',
                  'iddestinacija',
                  'brojsoba', 
                  'opis', 
                  'brojkreveta', 
                  'cenanocenja',
                  'naziv',
                  'rezs',
                  'idkorisnikvlasnik')