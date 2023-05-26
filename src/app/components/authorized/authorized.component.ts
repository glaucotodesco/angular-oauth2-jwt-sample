import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router,  private authService: AuthService, private tokenService: TokenService){}
  
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( data => {
      const code_verifier = this.authService.getVerifier();
      this.authService.deleteVerifier();
      this.getToken(data['code'], code_verifier);
    })
  }


  getToken(code: string, code_verifier: string): void {
    this.authService.getToken(code, code_verifier).subscribe(
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
