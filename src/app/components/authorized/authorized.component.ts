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

  code: string = '';
  token: string = '';

  constructor(private activatedRoute: ActivatedRoute,   private authService: AuthService, private tokenService: TokenService){}
  
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( data => {
      this.code = data['code'];
      this.getToken();
    })
  }


  getToken(): void {
    this.authService.getToken(this.code).subscribe(
      {
        next: data => {
          this.tokenService.setTokens(data.access_token, data.refresh_token);
          this.token = data;
        }, 
        error: error => console.log(error)
      }
      
    );
  }

}
