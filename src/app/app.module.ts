import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResourceInterceptor } from './interceptors/resources.interceptor';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AuthorizedComponent,
    UserComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true},
     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
