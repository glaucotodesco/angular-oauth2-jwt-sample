import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpParams} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 
  constructor ( private authService: AuthService, private tokenService: TokenService){}

  onLogout(){
    this.authService.logout();
  }

  isLogged():boolean {
    return this.tokenService.isLogged();
  }

  isAdmin():boolean {
    return this.tokenService.isAdmin();
  }
}
