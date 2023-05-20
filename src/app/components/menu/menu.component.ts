import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  authorize_uri = environment.authorize_uri;
  
  uri = '';
  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method,
    code_challenge: environment.code_challenge,
  }

  constructor (private router: Router){}

  onLogin(){
    const httpParams = new HttpParams({fromObject: this.params});
    const codeUrl = this.authorize_uri + httpParams.toString();
    this.uri = encodeURI(codeUrl);
    location.href = encodeURI(codeUrl);
    

  }
  onLogout(){

  }

}
