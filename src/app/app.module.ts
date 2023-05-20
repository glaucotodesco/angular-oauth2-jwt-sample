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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AuthorizedComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
