import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { PoService } from '../services/po.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-image-formatter',
  templateUrl: './image-formatter.component.html',
  styleUrls: ['./image-formatter.component.css']
})
export class ImageFormatterComponent implements ICellRendererAngularComp  {
  refresh(params: any): boolean {
   return false;
  }
  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
     
  }
  
  @Input() image:string;

  params: any;
  params2: any;
  
  ngOnInit(): void {
   // this.params=this.image;
  }


  ngOnChanges(changes: SimpleChanges) 
    {
    //  this.params=changes["image"].currentValue;
    }
  constructor(private _poService:PoService) { }

description:string;


  agInit(param) {
     this.params2=param;
     this.description=param.data.ItemDescription;
    // this._poService.getImage(param.data.ItemCode).subscribe(data=>{
    //   this.params=data;

      
    // });

  //  this.params=param.itemCode;
   }
 

   public invokeParentMethod() {
    this._poService.getImage( this.params2.data.ItemCode).subscribe(data=>{
      // this.params=data;
      this.params2.context.componentParent.methodFromParent(data);

      
    });
}



}
