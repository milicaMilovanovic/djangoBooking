import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Korisnik } from 'app/model/Korisnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Osoba } from 'app/model/Osoba';

const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':  'application/json'
    })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;

    form: FormGroup;
    korisnik: Korisnik;
    osoba: Osoba;
    korisnikVracen: Korisnik;
    email: string;
    lozinka: string;

    notifikacija :IAlert = {
        type: 'success',
        strong: 'Neuspeo login',
        message: 'Pogresni podaci.',
    }
    notifikacijaLogin: boolean = false;

    public closeAlert(alert: IAlert) { 
        this.notifikacijaLogin = false;
    }


    constructor(private http: HttpClient, private router: Router) {
        this.form = new FormGroup({
            email: new FormControl(''),
            lozinka: new FormControl('')
        })
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        localStorage.setItem('korisnik', "");
    }
    ngOnDestroy(){
    }

    public login() {
        this.korisnik = new Korisnik;
        this.korisnik.lozinka = this.form.get('lozinka').value;
        this.korisnik.email = this.form.get('email').value;
        this.osoba = new Osoba;

        this.http.post('http://localhost:8000/login/', this.korisnik, httpOptions).subscribe(
            (data:any) => {
                this.korisnikVracen = data;
                if (this.korisnikVracen != null) {
                    localStorage.setItem('korisnik', this.korisnikVracen.email);
                    localStorage.setItem('korisnikId', this.korisnikVracen.idkorisnik.toString());
                    this.router.navigate(['/pocetna']);
                }
                else {
                    this.notifikacijaLogin = true;
                    console.log("null korisnik");
                }
            },
            (error:any) => {
                this.notifikacijaLogin = true;
                console.log("greska u logovanju");
            }
            );
    }

}

export interface IAlert {
    type: string;
    strong?: string;
    message: string;
}

