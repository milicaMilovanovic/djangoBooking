from django.contrib import admin

from .models import Destinacija
from .models import Korisnik
from .models import Ocena
from .models import Osoba
from .models import Rezervacija
from .models import Smestaj


# Register your models here.

admin.site.register(Destinacija)
admin.site.register(Korisnik)
admin.site.register(Ocena)
admin.site.register(Osoba)
admin.site.register(Rezervacija)
admin.site.register(Smestaj)
