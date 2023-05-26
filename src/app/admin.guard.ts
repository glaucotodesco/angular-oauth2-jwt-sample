import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(): boolean {
    if (!this.tokenService.isAdmin()) {
      this.router.navigateByUrl("/");
      return false;
    }
    else {
      return true;
    }

  }
}