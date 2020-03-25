import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsComponent } from './components/components.component';
import { BasicelementsComponent } from './components/basicelements/basicelements.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TypographyComponent } from './components/typography/typography.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { NgbdModalBasic } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './komponente/login/login.component';
import { ExamplesComponent } from './examples/examples.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { CommonModule } from '@angular/common';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';
import { MeniComponent } from './komponente/meni/meni.component';
import { PocetnaComponent } from './komponente/pocetna/pocetna.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import { MojeRezervacijeComponent } from './komponente/mojeRezervacije/mojeRezervacije.component';
import { MojiSmestajiComponent } from './komponente/mojiSmestaji/mojiSmestaji.component';
import { ProfilComponent } from './komponente/profil/profil.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MeniComponent,
        PocetnaComponent,
        RegistracijaComponent,
        MojeRezervacijeComponent,
        MojiSmestajiComponent,
        ProfilComponent,
        
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalBasic,
        LandingComponent,
        LoginComponent,
        ExamplesComponent,
        ProfileComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule, 
        ReactiveFormsModule,
        CommonModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        })

    ],
    providers: [HttpClientModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
