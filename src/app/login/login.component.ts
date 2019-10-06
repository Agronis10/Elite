import { Component, OnInit } from '@angular/core';


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

  OnSend ({value,valid})
  {
    if (valid) 
     console.log(value)
    else
      console.log ("Not Valid")

  }



  
  constructor() { }

  ngOnInit() {
  }

  

}
