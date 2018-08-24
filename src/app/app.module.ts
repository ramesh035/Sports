import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, RequestOptions, XHRBackend } from "@angular/http";
import { AuthenticationService } from "./_services/authentication/authentication.service";
import { AuthGuard } from "./_guard/auth.guard";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//Adding Routes
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './_services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
