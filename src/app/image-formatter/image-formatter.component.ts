import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { PoService } from '../services/po.service';

@Component({
  selector: 'app-image-formatter',
  templateUrl: './image-formatter.component.html',
  styleUrls: ['./image-formatter.component.css']
})
export class ImageFormatterComponent implements OnInit {
  
  @Input() image:string;

  params: any;
 
  
  ngOnInit(): void {
   // this.params=this.image;
  }


  ngOnChanges(changes: SimpleChanges) 
    {
    //  this.params=changes["image"].currentValue;
    }
  constructor(private _poService:PoService) { }




  agInit(param) {
    
    this._poService.getImage(param.data.ItemCode).subscribe(data=>{
      this.params=data;
    });

  //  this.params=param.itemCode;
   }

  




}
