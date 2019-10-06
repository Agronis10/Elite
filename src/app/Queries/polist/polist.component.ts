import { Component, OnInit, enableProdMode } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';
import * as numeral from 'numeral';

@Component({
  selector: 'app-polist',
  templateUrl: './polist.component.html',
  styleUrls: ['./polist.component.css']
})
export class POListComponent  {
 
  columnDefs = [
    {headerName: 'PO #', field: 'PONum', sortable: true, filter: true},
    {headerName: 'Order Date', field: 'OrderDate',cellRenderer: params => { return moment(params.value).format('YYYY-MM-DD')}, sortable: true, filter: true},
    {headerName: 'Invoice', field: 'SuppInvoice', sortable: true, filter: true},
    {headerName: 'Currency', field: 'CurrencyName', sortable: true, filter: true},
    {headerName: 'Item Count', field: 'SItemCount', sortable: true, filter: true},
    {headerName: 'Order Amount', field: 'SLineAmount',cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true}
];

   
    pos :any=[];
  
  
     httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true' ,
            'access-control-allow-methods':'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS'
          })
        };

  constructor(public HttpClient:HttpClient ) { 
    
    this.GetPOS ();
  }

  ngOnInit() {
  }

GetPOS () {
 
//return  this.HttpClient.get('http://jsonplaceholder.typicode.com/users').subscribe(users=>{this.pos=pos});



return this.HttpClient.get('http://localhost:54530/api/po/5').subscribe( POData=>{this.pos=POData});
  // alert (this.PosTmp)
   //console.log(this.PosTmp)
   //this.pos= JSON.parse(Data);
  
}

 currencyFormatter(params) {
  return "\xA3" + this.formatNumber(params.value);
}
 
formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

}
