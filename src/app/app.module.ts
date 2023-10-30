import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { MaterialModule } from './material/material.module';
import { AuthService } from './services/auth/auth.service';
import { httpInterceptorProviders } from './services/auth/interceptor.service';
import { UserDisplayComponent } from './layouts/user-display/user-display.component';

@NgModule({
  declarations: [AppComponent, TopbarComponent, UserDisplayComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    AdminModule,
  ],
  providers: [AuthService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
