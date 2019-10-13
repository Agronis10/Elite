import { Component, OnInit } from '@angular/core';
import {User} from "../model/User"



@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
Name:string="Nir" ;
Age:number=43 ; 
Exist :boolean = false ; 
Emplyee:User;

  constructor() { 
    this.Emplyee.ID=12;
    this.Emplyee.Name='Nir';
    this.Age += 17 ; this.Name= "Nir Salab";
   }

  ngOnInit() {
  }

}
