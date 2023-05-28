import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../models/access-token';
import jwtDecode from 'jwt-decode';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_ID = 'user_id';
const USER_NAME = 'user_name';
const USER_REAL_NAME = 'user_real_name';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setTokens(access_token: string, refresh_token: string): void {
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
    
    let accessToken = this.getDecodedToken();
    localStorage.setItem(USER_ID, accessToken.userId);
    localStorage.setItem(USER_NAME, accessToken.userName);
    localStorage.setItem(USER_REAL_NAME, accessToken.userRealName);
  }
  
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  deleteTokens(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(USER_REAL_NAME);
  }


  getDecodedToken(): AccessToken {
    return jwtDecode(localStorage.getItem(ACCESS_TOKEN)!) as AccessToken;
  }

}