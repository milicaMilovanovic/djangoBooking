import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Korisnik } from 'app/model/Korisnik';
import { Osoba } from 'app/model/Osoba';

const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':  'application/json'
    })
};

@Component({
    selector: 'registracija',
    templateUrl: './registracija.component.html',
})
export class RegistracijaComponent implements OnInit {

    form: FormGroup;
    korisnik: Korisnik;
    osoba: Osoba;
    korisnikVracen: Korisnik;

    notifikacija :IAlert = {
        type: 'success',
        strong: 'Neuspela registracija',
        message: 'Profil sa ovim email-om vec postoji. Unesite drugi.',
    }
    notifikacijaReg: boolean = false;

    public closeAlert(alert: IAlert) { 
        this.notifikacijaReg = false;
    }

    constructor(private http: HttpClient, private router: Router) {
        this.form = new FormGroup({
            ime: new FormControl(''),
            prezime: new FormControl(''),
            email: new FormControl(''),
            lozinka: new FormControl(''),
            datumrodjenja: new FormControl(''),
            aboutme: new FormControl('')
        })
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        // moje
        localStorage.setItem('korisnik', "");
    }

    public register() {
        this.korisnik = new Korisnik;
        this.osoba = new Osoba;
        this.osoba.ime = this.form.get('ime').value;
        this.osoba.prezime = this.form.get('prezime').value;
        this.osoba.datumrodjenja = this.form.get('datumrodjenja').value;
        this.osoba.aboutme = this.form.get('aboutme').value;
        this.korisnik.email = this.form.get('email').value;
        this.korisnik.lozinka = this.form.get('lozinka').value;
        let idOsobe;
        //prvo dodam oosobu, i onda dobijem nazad njen id i onda sa tim id-om
        //dodam korisnika
        this.http.post('http://localhost:8000/add-osoba/', this.osoba, httpOptions).subscribe(
            (data: any) => {
                idOsobe = data;
                this.korisnik.idosoba = idOsobe;
                this.dodajKorisnika();
            }
        );
    }

    private dodajKorisnika() {
        this.http.post('http://localhost:8000/registracija/', this.korisnik, httpOptions).subscribe(
            (data: any) => {
                this.korisnikVracen = data;
                if (this.korisnikVracen != null) {
                    localStorage.setItem('korisnik', this.korisnikVracen.email);
                    localStorage.setItem('korisnikId', this.korisnikVracen.idkorisnik.toString());
                    console.log(this.korisnikVracen.email);
                    console.log(this.korisnikVracen.idkorisnik);
                    this.router.navigate(['/pocetna']);
                }
            },
            (error: any) => {
                //obrisati osobu
                this.notifikacijaReg = true;
                this.http.get('http://localhost:8000/delete-osoba/' + this.korisnik.idosoba + '/', httpOptions).subscribe(
                    (data: any) => {

                    }
                );
                console.log("neuspela registracija, error: " + error);
            }
        );
    }

}

export interface IAlert {
    type: string;
    strong?: string;
    message: string;
}