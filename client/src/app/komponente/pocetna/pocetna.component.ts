import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Smestaj } from 'app/model/Smestaj';
import { Rezervacija } from 'app/model/Rezervacija';
import { FormGroup, FormControl } from '@angular/forms';
import { Ocena } from 'app/model/Ocena';

const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':  'application/json'
    })
};

@Component({
    selector: 'pocetna',
    templateUrl: './pocetna.component.html'
})
export class PocetnaComponent implements OnInit{

    smestaji: Smestaj[];
    rezervacija: Rezervacija;
    form:FormGroup;
    rezervisiKliknuto: boolean;
    smestajId: number;

    formSort: FormGroup;

    smestajObjekat: Smestaj;

    smestajiSvi: Smestaj[];

    formPretraga: FormGroup;

    ocene: Ocena[] = [];
    prosecnaOcena: number;

    notifikacija :IAlert = {
        type: 'success',
        strong: 'Neuspela rezervacija',
        message: 'Ovi datumi su zauzeti.',
    }
    smestajNotifikacija: number = -1;

    ulogovanId: string;

    public closeAlert(alert: IAlert) { 
        this.smestajNotifikacija = -1;
    }

    constructor(private http: HttpClient, private router: Router) {
        this.form = new FormGroup({
            checkIn: new FormControl(''),
            checkOut: new FormControl('')
        });
        this.formSort = new FormGroup({
            sortKriterijum: new FormControl('')
        });
        this.formPretraga = new FormGroup({
            pretragaKriterijum: new FormControl(''),
            brojPretrage: new FormControl('')
        });
    }

    ngOnInit() {
        let localKorisnik = localStorage.getItem('korisnik');
        if ((typeof localKorisnik == 'undefined') || !localKorisnik) {
            this.router.navigate(['/login']);
        }
        this.ulogovanId = localStorage.getItem('korisnikId');
        this.getOcene();

        this.smestajId = -1;
        this.rezervisiKliknuto = false;
        this.http.get('http://localhost:8000/smestajall/', httpOptions).subscribe(
            (data: any) => {
                this.smestaji = data;
                for (let sm of this.smestaji) {
                    sm.slika = 'http://localhost:8000' + sm.slika;
                }
                this.smestajiSvi = this.smestaji;
            });

    }

    private getOcene() {
        this.http.get('http://localhost:8000/ocena-all/', httpOptions).subscribe(
            (data: any) => {
                this.ocene = data;
            }
        );
    }

    public rezervisiDatume(idsmestaj: any) {
        if (this.smestajId == idsmestaj && this.rezervisiKliknuto)
            this.rezervisiKliknuto = false;
        else 
            this.rezervisiKliknuto = true;

        this.smestajId = idsmestaj;

    }

    public rezervisi(idsmestaj: any, cenanocenja: any) {
        this.rezervacija = new Rezervacija;
        this.rezervacija.datumprijave = this.form.get('checkIn').value;
        this.rezervacija.datumodjave = this.form.get('checkOut').value;

        let datumprijave = new Date(this.rezervacija.datumprijave);
        let datumodjave = new Date(this.rezervacija.datumodjave);
        let brojNocenja = (datumodjave.getTime() - datumprijave.getTime()) / (1000*60*60*24);
        this.rezervacija.cenarezervacije = brojNocenja * cenanocenja;
        this.rezervacija.idkorisnik = +localStorage.getItem('korisnikId');
        this.rezervacija.idsmestaj = idsmestaj;

        if (datumprijave != null && datumodjave!= null) {
            if (datumprijave.getTime() < datumodjave.getTime()) {
                this.pomRezervisi(idsmestaj);
            }
        }

    }

    private pomRezervisi(idsmestaj: any) {
        this.http.post('http://localhost:8000/rezervacija/', this.rezervacija, httpOptions).subscribe(
            (data: any) => {
                this.smestajId = -1;
                this.smestajNotifikacija = -1;
                console.log("uspela je rez")
            },
            (error: any) => {
                this.smestajNotifikacija = idsmestaj;
                console.log("nije uspela rez")
            }
        )
    }

    public izracunajProsecnuOcenu(idSmestaja: Smestaj) {
        //prvo nadjem sve rez tog smestaja
        let idRezervacijaSmestaja = idSmestaja.rezs;

        if (idRezervacijaSmestaja.length != 0) {
            // sad idem kroz sve rez i pitam se da li ocena sadrzi id te 
            this.prosecnaOcena = 0;
            let sumaOcena = 0;
            let brojac = 0;
            let ocenaSad = null;
            for (let rez of idRezervacijaSmestaja) {
                ocenaSad = this.ocene.find(ocena => ocena.idrez == rez);
                if (ocenaSad != null) {
                    sumaOcena = sumaOcena + ocenaSad.ocena;
                    brojac = brojac + 1;
                    ocenaSad = null;
                }
            }
            if (sumaOcena == 0) {
                return false;
            }
            else {
                this.prosecnaOcena = sumaOcena / brojac;
                this.prosecnaOcena = +this.prosecnaOcena.toFixed(1);
                return true;
            }
        }
        return false;
 
    }

    public sortiraj() {
        let kriterijum = this.formSort.get('sortKriterijum').value;
        if (kriterijum == "brojsoba") {
            this.smestaji = this.smestaji.sort((s1, s2) => {
                if (s1.brojsoba > s2.brojsoba)
                    return 1;
                else if (s1.brojsoba < s2.brojsoba)
                    return -1;
                else 
                    return 0;
            });
        }
        else if (kriterijum == "cena") {
            this.smestaji = this.smestaji.sort((s1, s2) => {
                if (s1.cenanocenja > s2.cenanocenja)
                    return 1;
                else if (s1.cenanocenja < s2.cenanocenja) 
                    return -1;
                else 
                    return 0;
            });
        }
        else {
            this.smestaji = this.smestaji.sort((s1, s2) => {
                if (s1.brojkreveta > s2.brojkreveta) 
                    return 1;
                else if (s1.brojkreveta < s2.brojkreveta)
                    return -1;
                else 
                    return 0;
            });
        }
    }

    public pretrazi() {
        this.smestaji = this.smestajiSvi;
        let kriterijum = this.formPretraga.get('pretragaKriterijum').value;
        let brojPretrage = this.formPretraga.get('brojPretrage').value;
        if (!isNaN(brojPretrage) && brojPretrage != "" && kriterijum != "") { 
            if (kriterijum == "cena") {
                this.smestaji = this.smestaji.filter(smestaj => smestaj.cenanocenja <= brojPretrage);
            }
            else if (kriterijum == "brojkreveta") {
                this.smestaji = this.smestaji.filter(smestaj => smestaj.brojkreveta == brojPretrage); 
            }
            else {
                this.smestaji = this.smestaji.filter(smestaj => smestaj.brojsoba == brojPretrage);
            }
        }
        else {
            console.log("brojpretrage nije broj")
        }
    }

}

export interface IAlert {
    type: string;
    strong?: string;
    message: string;
}