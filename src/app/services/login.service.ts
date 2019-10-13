import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged:boolean;
  constructor(private http:HttpClient) { 
    //this.isLogged=false;
  }

  login(userName:string, password:string)
  {
    return this.http.get('http://localhost:54530/api/login/' + userName+"/"+password);
  }
  

}
