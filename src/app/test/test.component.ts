import { Component, OnInit } from '@angular/core';
import ContainerValidator from 'container-validator'


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onchange(event: any)
  {
    const validator = new ContainerValidator();
    // validator.isValid('TEXU3070079'); // boolean true
   var res ; 
   res = "12" ;
   alert(  isNaN(res)) ;
  }

}


