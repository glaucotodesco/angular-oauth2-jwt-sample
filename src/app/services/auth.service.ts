import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenUrl = environment.token_url
  authorize_uri = environment.authorize_uri;
  logout_url = environment.logout_url;

  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method,
    code_challenge: environment.code_challenge,
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public getToken(code: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', environment.grant_type);
    body.set('client_id', environment.client_id);
    body.set('redirect_uri', environment.redirect_uri);
    body.set('scope', environment.scope);
    body.set('code_verifier', environment.code_verifier);
    body.set('code', code);
    
    const basic_auth = 'Basic ' + btoa('client:secret');

    const headers_object = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Authorization': basic_auth
    });

    const httpOptions = { headers: headers_object };

    return this.http.post<any>(this.tokenUrl, body, httpOptions);
  }

  getAuthCode(): void {
    const httpParams = new HttpParams({ fromObject: this.params });
    const codeUrl = this.authorize_uri + httpParams.toString();
    location.href = encodeURI(codeUrl);
  }


  logout(): void {
    this.tokenService.deleteTokens();
    location.href = encodeURI(this.logout_url);
  }






}
