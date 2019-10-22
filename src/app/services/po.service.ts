import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpEvent} from '@angular/common/http';
import { Po } from '../model/po';
import { PoLine } from '../model/po-line';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PoService {
  res: number;
  constructor(private http:HttpClient) { }

  public getImage(itemCode:string)
  {
    return this.http.get('http://localhost:54530/api/po/ImageSRC/' + itemCode);

  }

 public getPos( OD1:string , OD2:string ):any
  {
    
  
   return this.http.get('http://localhost:54530/api/po/main/' +  OD1 +'/' + OD2+ '/'+ localStorage.getItem("currentUser")) ;
   
  }

public getPoDetails(id)
{
 let po:Po;
 return  this.http.get('http://localhost:54530/api/po/Details/' + id);
  // .subscribe(
  //   data=>{
  //    return  (data as Po);
  //   //  (data as Po[]).map(element => {
        
  //   //   });
  //   }
  // );
}

public updatePO(po:Po) 
{

    this.http.put <Response> ('http://localhost:54530/api/po'  ,po,{observe: 'response'}).subscribe(response=>this.res = response.status);
    return this.res 
    

  }


public addPo(po:Po)
{
  this.http.post('http://localhost:54530/api/po'  ,po).subscribe(data=>{});

}

public getItemsToNewPo()
{
  return this.http.get('http://localhost:54530/api/po/Details');
}
}
