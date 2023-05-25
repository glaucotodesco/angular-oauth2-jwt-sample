import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,   private authService: AuthService, private tokenService: TokenService){}
  
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( data => {
      this.getToken(data['code']);
    })
  }


  getToken(code: string): void {
    this.authService.getToken(code).subscribe(
      {
        next: data => {
          this.tokenService.setTokens(data.access_token, data.refresh_token);
        }, 
        error: error => console.log(error)
      }
    );
  }

}
