import { Component, OnInit, enableProdMode } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { Router } from '@angular/router';
import { PoService } from 'src/app/services/po.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ImageFormatterComponent } from 'src/app/image-formatter/image-formatter.component';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-polist',
  templateUrl: './polist.component.html',
  styleUrls: ['./polist.component.css']
})
export class POListComponent  {
 
  columnDefs = [
  
    {headerName: 'PO #', field: 'PO', sortable: true, filter: true},
    {headerName: 'Order Date', field: 'OrderDate',cellRenderer: params => { return moment(params.value).format('YYYY-MM-DD')}, sortable: true, filter: true},
    {headerName: 'Invoice', field: 'Invoice', sortable: true, filter: true},
    {headerName: 'Currency', field: 'Currency', sortable: true, filter: true},
    {headerName: 'Item Count', field: 'SItemCount', sortable: true, filter: true},
    {headerName: 'Order Amount', field: 'LineAmount',cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true}
];

   
  pos :any=[];
  fromDate:Date;
  toDate:Date;
  datePipe = new DatePipe('en-US');
  QueryParamCorrect : boolean=true;
  constructor( private _route:Router , private _poService:PoService ) { 
    
     //this.getPOS ();
  }

  ngOnInit() {
     
  }

 getPos() {
 
  
  if (this.fromDate == null || this.toDate == null)
  {
    this.QueryParamCorrect=false
    return
  }

  if (this.fromDate > this.toDate )
  {
    this.QueryParamCorrect=false
    return
  }
  this.QueryParamCorrect=true
  
  
 return this._poService.getPos(this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'),this.datePipe.transform(this.toDate, 'yyyy-MM-dd')).subscribe( POData=>{this.pos=POData});
 
 
}


openNewPo()
{
  this._route.navigateByUrl('Po/-1');
}
 currencyFormatter(params) {
  return "\xA3" + this.formatNumber(params.value);
}
 
formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}


openPo(event)
{
 this._route.navigateByUrl('Po/' + event.data.PO);
}
}
