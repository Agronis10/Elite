import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean;
  constructor(public _loginService:LoginService, private router: Router) { }

  ngOnInit() {
    this.isLogged=this._loginService.isLogged;

    if (!this.isLogged || localStorage.getItem("currentUser")==null)
    {
      this.router.navigate(['/Login']);
    }
  }

}
