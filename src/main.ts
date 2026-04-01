import '@angular/localize/init';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, AppRoutingModule, ToastrModule.forRoot())
  ]
}).catch((err) => console.error(err));
