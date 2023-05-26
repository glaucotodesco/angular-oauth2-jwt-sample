import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(): boolean {
    if (!this.tokenService.isLogged()) {
      this.router.navigateByUrl("/");
      return false;
    }
    else {
      return true;
    }

  }
}