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

@Component({
  selector: 'app-edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.css']
})
export class EditPOComponent implements OnInit {

  columnDefs = [
    {headerName: 'Item ', field: 'ItemDescription',width:100, sortable: true, filter: true ,
     cellRenderer:function(params){
      return "<a href='https://www.google.com?" + params.data.ItemCode +"'>" + params.value+"</a>";
    }},
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

PoData:Po;
imageBlobUrl: any ;
image :any ;

  constructor(private _poService:PoService ,private route: ActivatedRoute ) { }
id:number;
  ngOnInit() {
    this.route.params.subscribe(params => {
this.id=params["id"];
      this.getPOData() ;});
  }
   
//.subscribe(POData=>{this.PoData=POData[0].POLines})
    getPOData  () {
      if(this.id!= -1 )
      return this._poService.getPoDetails(this.id).subscribe(POData=>{this.PoData=(POData[0] as Po)});
      return this._poService.getItemsToNewPo().subscribe(POData=>{this.PoData=(POData[0] as Po)});

                  }

                  UpdatePOData()
                  {
                    if(this.id!= -1 )
                     this._poService.updatePO(this.PoData);

                     this._poService.addPo(this.PoData);

                  }
    // ShowPO ()
    //  {
    //   this.HttpClient.get('http://localhost:54530/api/po/ImageSRC/2000',this.httpOptions).subscribe( Img=>{this.imageBlobUrl=Img});

    //   var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(this.imageBlobUrl)));
    //   this.image = 'data:image/jpeg;base64,' + base64String

    //   console.log(this.imageBlobUrl)

    // }

    

    
    // createImageFromBlob(image: Blob) {
    //   let reader = new FileReader();
    //   reader.addEventListener("load", () => {
    //     this.imageBlobUrl = reader.result;
    //   }, false);
    //   if (image) {
    //     reader.readAsDataURL(image);
    //   }
    // }


}
