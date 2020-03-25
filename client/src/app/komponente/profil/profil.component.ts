import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { Korisnik } from 'app/model/Korisnik';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':  'application/json'
    })
};

@Component({
    selector: 'profil',
    templateUrl: './profil.component.html'
})
export class ProfilComponent implements OnInit{

    zoom: number = 14;
    lat: number = 44.445248;
    lng: number = 26.099672;
    styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
    data : Date = new Date();
    focus;
    focus1;

    //moje
    korisnik: Korisnik;


    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        var rellaxHeader = new Rellax('.rellax-header');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        //moje
        let localKorisnik = localStorage.getItem('korisnik');
        if ((typeof localKorisnik == 'undefined') || !localKorisnik) {
            this.router.navigate(['/login']);
        }

        let trenutniKorisnikId = localStorage.getItem('korisnikId');
        let url = 'http://localhost:8000/get-profil/' + trenutniKorisnikId + '/';
        this.http.get(url, httpOptions).subscribe(
            (data: any) => {
                this.korisnik = data;
                console.log(this.korisnik);
            }
        )
    }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

}