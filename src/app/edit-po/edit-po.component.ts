import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.css']
})
export class EditPOComponent implements OnInit {

  columnDefs = [
    {headerName: 'Item ', field: 'ItemDescription',width:100, sortable: true, filter: true},
    {headerName: 'Size 3', field: 'Unit_3',width:80,editable: true,valueParser: "Number(newValue)", sortable: true, filter: true,type: "valueColumn"},
    {headerName: 'Size 4', field: 'Unit_4',width:80,editable: true, sortable: true,valueParser: "Number(newValue)", filter: true,type: "valueColumn"},
    {headerName: 'Size 5', field: 'Unit_5',width:80,editable: true, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
    {headerName: 'Size 6', field: 'Unit_6',width:80,editable: true, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
    {headerName: 'Size 7', field: 'Unit_7',width:80,editable: true, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
    {headerName: 'Size 8', field: 'Unit_8',width:80,editable: true, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
    {headerName: 'Size 9', field: 'Unit_9',width:80,editable: true, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
    {headerName: 'Size 10', field: 'Unit_10',width:80,editable: true, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
    {headerName: 'Size 11', field: 'Unit_11',width:80,editable: true, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
    {headerName: 'Item Count', field: 'ItemCount', aggFunc: "sum", width:120, sortable: true, filter: true,valueParser: "Number(newValue)",type: "valueColumn",valueGetter: " data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11" },
    {headerName: 'Unit Price', field: 'BuyingRate',width:120,cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueParser: "Number(newValue)"},
    {headerName: 'Order Amount', field: 'LineAmount',aggFunc: "sum", allowedAggFuncs: ['sum','min','max'],width:120, cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueGetter: " (data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11) * data.BuyingRate "}
];

PoData:any=[];
ItemImage:any ;
thumbnailFetchUrl : string = "https://south/generateThumbnail?width=100&height=100";

  constructor(public HttpClient:HttpClient) { this.GetPOData() }

  ngOnInit() {
  }


  GetItemSrc () {
      this.HttpClient.get('http://localhost:54530/api/po/ImageSRC/2000').subscribe( IImage=>{this.ItemImage=IImage});
      //var uints = new Uint8Array(this.ItemImage);
      var base64 = btoa(this.ItemImage);
      var img = new Image();
      img.src = "data:image/jpeg;base64," + base64;
      //var url = 'data:image/jpeg;base64,' + base64; // use this in <img src="..."> binding
    }

    GetPOData  () {
      return this.HttpClient.get('http://localhost:54530/api/po/Details/1013').subscribe( POData=>{this.PoData=POData});
      

   }

  
    ShowPO ()
    {
      console.log(this.PoData)
    }

    UpdatePOData () 
    {
      return this.HttpClient.put  ('http://localhost:54530/api/tbl_008_PO/' +this.PoData ,this.PoData);
    }


}
