import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Smestaj } from 'app/model/Smestaj';
import { FormGroup, FormControl } from '@angular/forms';
import { Destinacija } from 'app/model/Destinacija';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ocena } from 'app/model/Ocena';

const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':  'application/json'
    })
};

const httpOptionsSlika = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':  'multipart-form-data'
    })
};

@Component({
    selector: 'mojiSmestaji',
    templateUrl: './mojiSmestaji.component.html'
})
export class MojiSmestajiComponent implements OnInit {

    mojiSmestaji: Smestaj[];
    mojiSmestajiSvi: Smestaj[];
    form: FormGroup;
    destinacije: Destinacija[];
    novSmestaj: Smestaj;
    formSort: FormGroup;
    formPretraga: FormGroup;

    prosecnaOcena: number;
    ocene: Ocena[];

    //modal
    public open(content) {
        this.modalService.open(content).result.then((result) => {
        });
    }



    constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) {
        this.form = new FormGroup({
            naziv: new FormControl(''),
            brojsoba: new FormControl(''),
            brojkreveta: new FormControl(''),
            cenanocenja: new FormControl(''),
            opis: new FormControl(''),
            destinacija: new FormControl('')
        });
        this.formSort = new FormGroup({
            sortKriterijum: new FormControl('')
        });
        this.formPretraga = new FormGroup({
            pretragaKriterijum: new FormControl(''),
            brojPretrage: new FormControl('')
        });
    }

    public ngOnInit() {
        let localKorisnik = localStorage.getItem('korisnik');
        if ((typeof localKorisnik == 'undefined') || !localKorisnik) {
            this.router.navigate(['/login']);
        }
        
        //moje
        this.getMojiSmestaji();
        this.getAllDestinacije();
        this.getOcene();
    }

    private getMojiSmestaji() {
        let korisnikId = +localStorage.getItem('korisnikId');
        this.http.get('http://localhost:8000/moji-smestaji/' + korisnikId + '/', httpOptions).subscribe(
            (data: any) => {
                this.mojiSmestaji = data;
                for (let sm of this.mojiSmestaji) {
                    sm.slika = 'http://localhost:8000' + sm.slika;
                }
                this.mojiSmestajiSvi = this.mojiSmestaji;
            }
        );
    }

    private getAllDestinacije() {
        this.http.get('http://localhost:8000/destinacije/', httpOptions).subscribe(
            (data: any) => {
                this.destinacije = data;
            }
        )
    }

    private getOcene() {
        this.http.get('http://localhost:8000/ocena-all/', httpOptions).subscribe(
            (data: any) => {
                this.ocene = data;
            }
        );
    }

    public dodajSmestaj() {
        console.log("usao u dodaj smestaj");
        this.novSmestaj = new Smestaj;
        this.novSmestaj.naziv = this.form.get('naziv').value;
        this.novSmestaj.brojsoba = this.form.get('brojsoba').value;
        this.novSmestaj.brojkreveta = this.form.get('brojkreveta').value;
        this.novSmestaj.cenanocenja = this.form.get('cenanocenja').value;
        this.novSmestaj.opis = this.form.get('opis').value;
        this.novSmestaj.iddestinacija = this.form.get('destinacija').value;
        this.novSmestaj.idkorisnikvlasnik = +localStorage.getItem('korisnikId');
        this.http.post('http://localhost:8000/novSmestaj/', this.novSmestaj, httpOptions).subscribe(
            (data: any) => {
                this.getMojiSmestaji();
            },
            (error: any) => {
            }
        );
        
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
                this.prosecnaOcena.toFixed(2);
                return true;
            }
        }
        return false;
 
    }

    public sortiraj() {
        this.mojiSmestaji = this.mojiSmestajiSvi;
        let kriterijum = this.formSort.get('sortKriterijum').value;
        if (kriterijum == "brojsoba") {
            this.mojiSmestaji = this.mojiSmestaji.sort((s1, s2) => {
                if (s1.brojsoba > s2.brojsoba)
                    return 1;
                else if (s1.brojsoba < s2.brojsoba)
                    return -1;
                else 
                    return 0;
            });
        }
        else if (kriterijum == "cena") {
            this.mojiSmestaji = this.mojiSmestaji.sort((s1, s2) => {
                if (s1.cenanocenja > s2.cenanocenja)
                    return 1;
                else if (s1.cenanocenja < s2.cenanocenja) 
                    return -1;
                else 
                    return 0;
            });
        }
        else {
            this.mojiSmestaji = this.mojiSmestaji.sort((s1, s2) => {
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
        this.mojiSmestaji = this.mojiSmestajiSvi;
        let kriterijum = this.formPretraga.get('pretragaKriterijum').value;
        let brojPretrage = this.formPretraga.get('brojPretrage').value;
        if (!isNaN(brojPretrage) && brojPretrage != "" && kriterijum != "") { 
            if (kriterijum == "cena") {
                this.mojiSmestaji = this.mojiSmestaji.filter(smestaj => smestaj.cenanocenja <= brojPretrage);
            }
            else if (kriterijum == "brojkreveta") {
                this.mojiSmestaji = this.mojiSmestaji.filter(smestaj => smestaj.brojkreveta == brojPretrage); 
            }
            else {
                this.mojiSmestaji = this.mojiSmestaji.filter(smestaj => smestaj.brojsoba == brojPretrage);
            }
        }
        else {
            console.log("brojpretrage nije broj")
        }
    }

}