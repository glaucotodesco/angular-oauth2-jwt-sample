import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import * as CryptoJS from 'crypto-js';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CODE_VERIFIER = 'code_verifier';
const ACCESS_TOKEN = 'access_token';

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
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public getToken(code: string, code_verifier: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', environment.grant_type);
    body.set('client_id', environment.client_id);
    body.set('redirect_uri', environment.redirect_uri);
    body.set('scope', environment.scope);
    body.set('code_verifier', code_verifier);
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
    const code_verifier = this.generateCodeVerifier();
    this.setVerifier(code_verifier);
    this.params.code_challenge = this.generateCodeChallenge(code_verifier);
    const httpParams = new HttpParams({ fromObject: this.params });
    const codeUrl = this.authorize_uri + httpParams.toString();
    location.href = encodeURI(codeUrl);
  }


  logout(): void {
    this.tokenService.deleteTokens();
    location.href = encodeURI(this.logout_url);
  }

  generateCodeVerifier(): string {
    let result = '';
    const char_length = CHARACTERS.length;
    for(let i =0; i < 44; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * char_length));
    }
    return result;
  }

  generateCodeChallenge(code_verifier: string): string {
    const codeverifierHash = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64);
    const code_challenge = codeverifierHash
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    return code_challenge;
  }

  isLogged(): boolean {
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  isAdmin(): boolean {
    if(!this.isLogged()) {
      return false;
    }
    const token = this.tokenService.getAccessToken();
    const payload = token?.split(".")[1] || "";
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  setVerifier(code_verifier: string): void {
    if(localStorage.getItem(CODE_VERIFIER)) {
      this.deleteVerifier();
    }
    const encrypted = CryptoJS.AES.encrypt(code_verifier, environment.secret_pkce);
    localStorage.setItem(CODE_VERIFIER, encrypted.toString());
  }

  getVerifier(): string {
    const encrypted = localStorage.getItem(CODE_VERIFIER) || "";
    const decrypted = CryptoJS.AES.decrypt(encrypted, environment.secret_pkce).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
  
  deleteVerifier(): void {
    localStorage.removeItem(CODE_VERIFIER);
  }

}
