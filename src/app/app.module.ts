import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

// modulos personalizados
import { AngularMaterialModule } from '@angular-material/angular-material.module';
import { MainModule } from '@main/main.module';
import { SharedModule } from '@shared/shared.module';

// interceptors
import { InterceptorMainService } from '@interceptors/interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MainModule,
    AngularMaterialModule,
    SharedModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorMainService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
