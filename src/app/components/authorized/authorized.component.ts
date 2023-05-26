import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-authorized',
  template: '',
  styleUrls: []
})
export class AuthorizedComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router,  private authService: AuthService, private tokenService: TokenService){}
  
  ngOnInit(): void {
    //Get Auth Code From AuthServer
    this.activatedRoute.queryParams.subscribe( data => {
      this.getToken(data['code']);
    })
  }

  getToken(code: string): void {
    this.authService.getToken(code).subscribe(
      {
        next: data => {
          this.tokenService.setTokens(data.access_token, data.refresh_token);
          this.router.navigate(['/home']);
        }, 
        error: error => console.log(error)
      }
    );
  }

}
