import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Po } from '../model/po';
import { PoLine } from '../model/po-line';


@Injectable({
  providedIn: 'root'
})
export class PoService {

  constructor(private http:HttpClient) { }


 public getPos():any
  {
   return this.http.get('http://localhost:54530/api/po/main');
   
  }

public getPoDetails(id)
{
  return this.http.get('http://localhost:54530/api/po/Details/' + id);
  
  // .subscribe(
  //   data=>{
  //    (data as PoLine[]).map(element => {
        
  //     });
    //}
  //);
}

public updatePO(po:Po)
{
  this.http.put ('http://localhost:54530/api/po/'  ,po);
}

public getItemsToNewPo()
{
  return this.http.get('http://localhost:54530/api/po/Details');
}
}
