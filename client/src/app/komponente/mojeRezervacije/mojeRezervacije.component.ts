import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    selector: 'moje-rezervacije',
    templateUrl: './mojeRezervacije.component.html',
})
export class MojeRezervacijeComponent implements OnInit {

    mojeRezervacije: Rezervacija[];
    trenutniKorisnikId: number;
    today = new Date();
    oceniKliknuto: boolean;
    rezervacijaId: number;
    url: string;

    ocena: Ocena;

    ocene: Ocena[] = [];
    trazeneOcene: Ocena[] = [];

    form: FormGroup;

    trenutnaOcena: Ocena;

    constructor(private http: HttpClient, private router: Router) {
        this.form = new FormGroup({
            ocena: new FormControl(''),
            komentar: new FormControl('')
        });
    }

    public ngOnInit() {
        let localKorisnik = localStorage.getItem('korisnik');
        if ((typeof localKorisnik == 'undefined') || !localKorisnik) {
            this.router.navigate(['/login']);
        }

        this.rezervacijaId = -1;
        this.oceniKliknuto = false;

        this.trenutniKorisnikId = +localStorage.getItem('korisnikId');

        this.getRezervacije();

    }

    private getRezervacije() {
        this.url = 'http://localhost:8000/rezervacije/' + this.trenutniKorisnikId + '/';
        this.http.get(this.url, httpOptions).subscribe(
            (data: any) => {
                this.mojeRezervacije = data; 
            }
        );
        this.getOcene();
    }

    private getOcene() {
        this.http.get('http://localhost:8000/ocena-all/', httpOptions).subscribe(
            (data: any) => {
                this.ocene = data;
            }
        );
    }

    public compareDatesAndCheckOcena(formaOdjavaDatum: any, idRez: any) {
        this.trazeneOcene;
        //prvo proveravam da li vec postoji ocena
        this.trazeneOcene = this.ocene.filter(ocena => ocena.idrez == idRez);
        if (this.trazeneOcene.length == 0) {
            //posto ocena ne postoji proveravam i da li je prosao datum checkouta
            let danasnjiDatum = new Date().getTime();
            let datumSaForme = new Date(formaOdjavaDatum).getTime();
            if (datumSaForme <= danasnjiDatum) {
                return true;
            }
        }
        return false;
    }

    public oceni(idRez: any) {
        if (this.rezervacijaId == idRez && this.oceniKliknuto)
            this.oceniKliknuto = false;
        else 
            this.oceniKliknuto = true;

        this.rezervacijaId = idRez;
    }

    public oceniRezervaciju(idRez: any) {
        this.ocena = new Ocena;
        this.ocena.ocena = this.form.get('ocena').value;
        this.ocena.komentar = this.form.get('komentar').value;
        this.ocena.idrez = idRez;
        
        this.http.post('http://localhost:8000/oceni/', this.ocena, httpOptions).subscribe(
            (data: any) => {
                this.rezervacijaId = -1;
                this.getRezervacije();
            }  
        );
    }

    public postojiOcena(idRez: any) {
        let ocenaZaRez = this.ocene.filter(ocena => ocena.idrez == idRez);
        if (ocenaZaRez.length != 0) {
            this.trenutnaOcena = ocenaZaRez.pop();
            return true;
        }
        return false;
    }

    public prosaoDatumPrijave(datumPrijave: any) {
        let danasnjiDatum = new Date().getTime();
        let datumSaForme = new Date(datumPrijave).getTime();
        if (danasnjiDatum < datumSaForme)
            return true;
        return false;
    }

    public otkaziRez(idRez: any, datumPrijave: any) {
        let danasnjiDatum = new Date().getTime();
        let datumPrijaveSaForme = new Date(datumPrijave).getTime();
        let razlikaUDanima = (datumPrijaveSaForme - danasnjiDatum) / (1000*3600*24);
        console.log(razlikaUDanima);
        if (razlikaUDanima <= 5) {
                //ispisi da ce mu biti naplaceno 10% jer nije otkazao 5 dana pre checkina
                console.log("bice vam naplaceno 10%");
        }
        //ispisi da je ok
        this.http.get('http://localhost:8000/otkazi-rez/' + idRez + '/', httpOptions).subscribe(
            (data: any) => {
                console.log("vasa rez je otkazana");
                this.getRezervacije();
            }
        )
    }

}

export interface IAlert {
    type: string;
    strong?: string;
    message: string;
}