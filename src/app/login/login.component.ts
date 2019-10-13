import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../model/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  user={
    Name :'',
    Password :''
  }

  currentUser:User;
  isError:boolean;

  constructor(private _loginService:LoginService ,   private router: Router) {
      localStorage.setItem("currentUser" , null);
      this._loginService.isLogged=false;
  }


  OnSend ({value,valid})
  {
    if (!valid) return;
 
this._loginService.login(value.name, value.Password).subscribe(
 data=> {
     this.currentUser=(data as User);

     if (this.currentUser!= null)
   {  this._loginService.isLogged=true;

     localStorage.setItem("currentUser" , this.currentUser.EntityId);
     this.isError=false;
     this.router.navigate(['/PoList']);

    }
    else
    {
      this._loginService.isLogged=false;

      localStorage.setItem("currentUser" , null);
      this.isError=true;

    }

  }
)
    // if (valid) 
    //  console.log(value)
    // else
    //   console.log ("Not Valid")

  }

 

  ngOnInit() {
  }

  

}
