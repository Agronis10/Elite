import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpResponse} from '@angular/common/http';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { Observable, from } from 'rxjs';
import { PoService } from '../services/po.service';
import { ActivatedRoute } from '@angular/router';
import { PoLine } from '../model/po-line';
import { Po } from '../model/po';
// import {Blob2ImageService} from '../blob2-image.service'
import {MatFormFieldModule} from '@angular/material/form-field';
import { Currency } from '../model/currency';
import { CurrencyService } from '../services/currency.service';
import { ImageFormatterComponent } from '../image-formatter/image-formatter.component';
import { now } from 'moment';
import { debug } from 'util';


@Component({
  selector: 'app-edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.css']
})
export class EditPOComponent implements OnInit {


   getRowHeight(params) {
    return 50;
  };

  iCurrency :string;
PONum: String ; 
PoData:Po;
OrderDate :string;
imageBlobUrl: any ;
image :any ;
currencies:Currency[];
disable:boolean;
ReturnStatus :number;
columnDefs;
  constructor(private _poService:PoService ,private route: ActivatedRoute , private _currencyService:CurrencyService) { }
id:number;
  context;
  frameworkComponents;
block:boolean;
  src:string;
type:string;
 comTypeName:string;
  ngOnInit() {
      this.route.params.subscribe(params => {
        
      this.id=params["id"];
      this.type=params["type"];
 

      this.context = { componentParent: this };
      this.frameworkComponents = {
      
        imageFormatterRenderer: ImageFormatterComponent
      };
      //this.GetCurrencies();
      this.getPOData() ;});
  }
  
  methodFromParent(src) {
    var modal = document.getElementById("myModal");
   this.block=true;
   this.src=src;
  }
  
  private GetCurrencies() {
    this._currencyService.getCurrency().subscribe(data => {
      this.currencies = (data as Currency[]);
    });
  }

 
    getPOData  () {

      this.iCurrency= "USD" ; 

     if (this.id== -1 ) 
     {
   //   this.PONum= "New PO" ; 
      this.OrderDate = moment( Date.now()).format('MM-DD-YYYY') ;
      
     }
     
     
      if(this.id!= -1 )
    
      return this._poService.getPoDetails(this.id).subscribe(POData=>{this.PoData=(POData as Po);
    
      if (this.PoData.Invoice!=undefined && this.PoData.Invoice!=null&& this.PoData.Invoice!="")
      this.disable=true;
      debugger;
      this.initColumns(this.PoData.ComType);
      
      this.PONum = this.PoData.PO ; 
      this.OrderDate = moment( this.PoData.OrderDate).format('MM-DD-YYYY') ;
     this.comTypeName= this.getComTypeName(this.PoData.ComType);
     
        
}
          
          
          );

                  }


                  
                  UpdatePOData()
                  {
                    if(this.id!= -1 )
                    
                    this._poService.updatePO(this.PoData).subscribe(
                      response=> {debugger;this.ReturnStatus = response.status},
                      err => {this.ReturnStatus = err.status},
                      
                      );
                    else
                     this._poService.addPo(this.PoData).subscribe(response=> {debugger;this.ReturnStatus = response.status});

                  }
  

                  initColumns(type)
                  {
                    this. columnDefs = [

                      {headerName: 'Item ', field: 'ItemDescription',width:100, sortable: true, filter: true ,
                      cellRendererFramework: ImageFormatterComponent,
                      cellRendererParams:function(params){
                       itemCode:params.data;
                      } 
                    },
                    //    {headerName: 'Item ', field: 'ItemDescription',width:100, sortable: true, filter: true , cellRenderer: function(params) {
                    //     return '<a href=\'bill/' + params.data.id + '\'></a>';
                    // }},
                      {headerName: 'G3/C12 ', field: 'Unit_3',width:80,editable: !this.disable ,valueParser: "Number(newValue)", sortable: true, filter: true,type: "valueColumn"},
                      {headerName: 'G4/C14', field: 'Unit_4',width:80,editable: !this.disable, sortable: true,valueParser: "Number(newValue)", filter: true,type: "valueColumn"},
                      {headerName: 'G5/C16', field: 'Unit_5',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                      {headerName: 'G6/C18', field: 'Unit_6',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                      {headerName: 'G7/C-S', field: 'Unit_7',width:100,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                      {headerName: 'G8/C-M', field: 'Unit_8',width:100,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                      {headerName: 'G9/C-L', field: 'Unit_9',width:100,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                      {headerName: 'G10/C-XL', field: 'Unit_10',width:100,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                      {headerName: 'G11/C-XXL', field: 'Unit_11',width:100,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                      {headerName: 'Item Count', field: 'ItemCount', aggFunc: "sum", width:120, sortable: true, filter: true,valueParser: "Number(newValue)",type: "valueColumn",valueGetter: " data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11" },
                      {headerName: 'Unit Price', field: 'BuyingRate',width:120,cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueParser: "Number(newValue)"},
                      {headerName: 'Order Amount', field: 'LineAmount',aggFunc: "sum", allowedAggFuncs: ['sum','min','max'],width:120, cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueGetter: " (data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11) * data.BuyingRate "}
                  ];
                    switch(type)
                    {

                      case "1":
                        this. columnDefs = [

                          {headerName: 'Item ', field: 'ItemDescription',width:300, sortable: true, filter: true ,
                          cellRendererFramework: ImageFormatterComponent,
                          cellRendererParams:function(params){
                           itemCode:params.data;
                          } 
                        },
                        //    {headerName: 'Item ', field: 'ItemDescription',width:100, sortable: true, filter: true , cellRenderer: function(params) {
                        //     return '<a href=\'bill/' + params.data.id + '\'></a>';
                        // }},
                          {headerName: 'Size 3', field: 'Unit_3',width:80,editable: !this.disable ,valueParser: "Number(newValue)", sortable: true, filter: true,type: "valueColumn"},
                          {headerName: 'Size 4', field: 'Unit_4',width:80,editable: !this.disable, sortable: true,valueParser: "Number(newValue)", filter: true,type: "valueColumn"},
                          {headerName: 'Size 5', field: 'Unit_5',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 6', field: 'Unit_6',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 7', field: 'Unit_7',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 8', field: 'Unit_8',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 9', field: 'Unit_9',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 10', field: 'Unit_10',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 11', field: 'Unit_11',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Item Count', field: 'ItemCount', aggFunc: "sum", width:120, sortable: true, filter: true,valueParser: "Number(newValue)",type: "valueColumn",valueGetter: " data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11" },
                          {headerName: 'Unit Price', field: 'BuyingRate',width:120,cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueParser: "Number(newValue)"},
                          {headerName: 'Order Amount', field: 'LineAmount',aggFunc: "sum", allowedAggFuncs: ['sum','min','max'],width:120, cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueGetter: " (data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11) * data.BuyingRate "}
                      ];
                      break;

                      case "2":
                        this. columnDefs = [

                          {headerName: 'Item ', field: 'ItemDescription',width:300, sortable: true, filter: true ,
                          cellRendererFramework: ImageFormatterComponent,
                          cellRendererParams:function(params){
                           itemCode:params.data;
                          } 
                        },
                        //    {headerName: 'Item ', field: 'ItemDescription',width:100, sortable: true, filter: true , cellRenderer: function(params) {
                        //     return '<a href=\'bill/' + params.data.id + '\'></a>';
                        // }},
                          {headerName: 'Size 12', field: 'Unit_3',width:80,editable: !this.disable ,valueParser: "Number(newValue)", sortable: true, filter: true,type: "valueColumn"},
                          {headerName: 'Size 14', field: 'Unit_4',width:80,editable: !this.disable, sortable: true,valueParser: "Number(newValue)", filter: true,type: "valueColumn"},
                          {headerName: 'Size 16', field: 'Unit_5',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 18', field: 'Unit_6',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size S', field: 'Unit_7',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size M', field: 'Unit_8',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size L', field: 'Unit_9',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size XL', field: 'Unit_10',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size XXL', field: 'Unit_11',width:100,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Item Count', field: 'ItemCount', aggFunc: "sum", width:120, sortable: true, filter: true,valueParser: "Number(newValue)",type: "valueColumn",valueGetter: " data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11" },
                          {headerName: 'Unit Price', field: 'BuyingRate',width:120,cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueParser: "Number(newValue)"},
                          {headerName: 'Order Amount', field: 'LineAmount',aggFunc: "sum", allowedAggFuncs: ['sum','min','max'],width:120, cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueGetter: " (data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11) * data.BuyingRate "}
                      ];
                      break;

                      case "3":
                        this. columnDefs = [

                          {headerName: 'Item ', field: 'ItemDescription',width:300, sortable: true, filter: true ,
                          cellRendererFramework: ImageFormatterComponent,
                          cellRendererParams:function(params){
                           itemCode:params.data;
                          } 
                        },
                        //    {headerName: 'Item ', field: 'ItemDescription',width:100, sortable: true, filter: true , cellRenderer: function(params) {
                        //     return '<a href=\'bill/' + params.data.id + '\'></a>';
                        // }},
                          {headerName: 'Size 3', field: 'Unit_3',width:80,editable: !this.disable ,valueParser: "Number(newValue)", sortable: true, filter: true,type: "valueColumn"},
                          {headerName: 'Size 4', field: 'Unit_4',width:80,editable: !this.disable, sortable: true,valueParser: "Number(newValue)", filter: true,type: "valueColumn"},
                          {headerName: 'Size 5', field: 'Unit_5',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 6', field: 'Unit_6',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 7', field: 'Unit_7',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 8', field: 'Unit_8',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 9', field: 'Unit_9',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 10', field: 'Unit_10',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Size 11', field: 'Unit_11',width:80,editable: !this.disable, sortable: true, filter: true,type: "valueColumn",valueParser: "Number(newValue)"},
                          {headerName: 'Item Count', field: 'ItemCount', aggFunc: "sum", width:120, sortable: true, filter: true,valueParser: "Number(newValue)",type: "valueColumn",valueGetter: " data.Unit_3 + data.Unit_4 + data.Unit_5 + data.Unit_6 + data.Unit_7 + data.Unit_8 + data.Unit_9 + data.Unit_10 + data.Unit_11" },
                          {headerName: 'Unit Price', field: 'BuyingRate',width:120,cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueParser: "Number(newValue)"},
                          {headerName: 'Order Amount', field: 'LineAmount',aggFunc: "sum", allowedAggFuncs: ['sum','min','max'],width:120, cellRenderer: params => { return numeral(params.value).format('0,00.00')}, sortable: true, filter: true,valueGetter: " 0.00"}
                      ];
                      break;


                    }
                 



                  }



                  getComTypeName(ComType)
                  {
                    switch(ComType)
                    {
                      case "1": 
                      {
                      return   "Gloves";
                        break;
                      }
                      case "2": 
                      {
                        return  "Clothing";
                        break;
                      }
                      case "3": 
                      {
                        return  "SponsorShip";
                        break;
                      }
                    }
                  }
                  
}
