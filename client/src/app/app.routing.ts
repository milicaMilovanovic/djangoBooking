import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './komponente/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { PocetnaComponent } from './komponente/pocetna/pocetna.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import { MojeRezervacijeComponent } from './komponente/mojeRezervacije/mojeRezervacije.component';
import { MojiSmestajiComponent } from './komponente/mojiSmestaji/mojiSmestaji.component';
import { ProfilComponent } from './komponente/profil/profil.component';

const routes: Routes =[
    { path: 'login',                component: LoginComponent },
    { path: 'registracija',         component: RegistracijaComponent },
    { path: 'pocetna',              component: PocetnaComponent },
    { path: 'mojeRezervacije',      component: MojeRezervacijeComponent },
    { path: 'mojiSmestaji',         component: MojiSmestajiComponent },
    { path: 'profil',          component: ProfilComponent },
    { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/profile',     component: ProfileComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
