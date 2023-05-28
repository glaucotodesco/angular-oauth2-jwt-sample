import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import * as CryptoJS from 'crypto-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../models/role';


const ACCESS_TOKEN = 'access_token';
const CODE_VERIFIER = 'code_verifier';
const USER_ID = 'user_id';
const USER_NAME = 'user_name';
const USER_REAL_NAME = 'user_real_name';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService, public jwtHelper: JwtHelperService) { }

  //New!
  public getAuthCode(): void {
    const httpParams = new HttpParams({ fromObject: this.createAuthCodeParams() });
    const codeUrl = environment.authorize_uri + httpParams.toString();
    location.href = encodeURI(codeUrl);
  }


  //New!
  public getToken(code: string): Observable<any> {
    const body = this.createTokenBody(code);
    const httpOptions = this.createTokenHttpOptions();
    return this.http.post<any>(environment.token_url, body, httpOptions);
  }


  //OK!
  public logout(): void {
    this.tokenService.deleteTokens();
    location.href = encodeURI(environment.logout_url);
  }

  //OK!
  public isLogged(): boolean {
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  //OK!
  public isAdmin(): boolean {
    return this.isAllowedByRole(['ROLE_ADMIN']);
  }

  //OK!
  public getUserRealName(): string | null {
    return localStorage.getItem(USER_REAL_NAME);
  }

  //OK!
  public getUSerName(): string | null {
    return localStorage.getItem(USER_NAME);
  }

  //OK!
  public getUserId(): string | null {
    return localStorage.getItem(USER_ID);
  }

  /*************** Private Methods *******************/
  private isAllowedByRole(routeRoles: Role[] = []): boolean {

    if (routeRoles.length === 0) {
      return true;
    }
    else {
      const { roles = [] } = this.tokenService.getDecodedToken();
      return routeRoles.some(role => roles?.includes(role));
    }
  }



  private generateCodeVerifier(): string {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    const char_length = CHARACTERS.length;
    for (let i = 0; i < 44; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * char_length));
    }

    this.setVerifier(result);

    return result;
  }

  private generateCodeChallenge(code_verifier: string): string {
    const codeverifierHash = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64);
    const code_challenge = codeverifierHash
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    return code_challenge;
  }

  private setVerifier(code_verifier: string): void {
    if (localStorage.getItem(CODE_VERIFIER)) {
      this.deleteVerifier();
    }
    const encrypted = CryptoJS.AES.encrypt(code_verifier, environment.secret_pkce);
    localStorage.setItem(CODE_VERIFIER, encrypted.toString());
  }

  private getVerifier(): string {
    const encrypted = localStorage.getItem(CODE_VERIFIER) || "";
    const decrypted = CryptoJS.AES.decrypt(encrypted, environment.secret_pkce).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  private deleteVerifier(): void {
    localStorage.removeItem(CODE_VERIFIER);
  }

  private createTokenBody(code: string): URLSearchParams {
    const body = new URLSearchParams();
    body.set('grant_type', environment.grant_type);
    body.set('client_id', environment.client_id);
    body.set('redirect_uri', environment.redirect_uri);
    body.set('scope', environment.scope);
    body.set('code_verifier', this.getVerifier());
    body.set('code', code);

    this.deleteVerifier();

    return body;
  }

  private createTokenHttpOptions(): any {
    const basic_auth = 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret);
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Authorization': basic_auth
    });
    return { headers: headers_object };
  }

  private createAuthCodeParams(): any {
    const code_verifier = this.generateCodeVerifier();
    return {
      client_id: environment.client_id,
      redirect_uri: environment.redirect_uri,
      scope: environment.scope,
      response_type: environment.response_type,
      response_mode: environment.response_mode,
      code_challenge_method: environment.code_challenge_method,
      code_challenge: this.generateCodeChallenge(code_verifier)
    }
  }

}
