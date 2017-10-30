import { FacebookService } from './services/facebook.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';


const appRoutes: Routes = [ 
  {path: '', component: HomeComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'extras', component: ExtrasComponent},
  {path: 'login', component: LoginComponent, canActivate: [AnonymousGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalculatorComponent,
    ResourcesComponent,
    ExtrasComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthGuard, FacebookService, AnonymousGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
