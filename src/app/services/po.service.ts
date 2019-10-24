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
    return this.http.get('https://www.elitedistribution.soccer/EliteAPI/api/po/ImageSRC/' + itemCode);
    //return this.http.get('http://localhost:54530/api/po/ImageSRC/' + itemCode);

  }

 public getPos( OD1:string , OD2:string ):any
  {
    
  
   return this.http.get('https://www.elitedistribution.soccer/EliteAPI/api/po/main/' +  OD1 +'/' + OD2+ '/'+ localStorage.getItem("currentUser")) ;
   //return this.http.get('http://localhost:54530/api/po/main/' +  OD1 +'/' + OD2+ '/'+ localStorage.getItem("currentUser")) ;
   
  }

public getPoDetails(id)
{
 let po:Po;
 //return  this.http.get('http://localhost:54530/api/po/Details/' + id);
 return  this.http.get('https://www.elitedistribution.soccer/EliteAPI/api/po/Details/' + id);
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

   return this.http.put <Response> ('https://www.elitedistribution.soccer/EliteAPI/api/po'  ,po,{observe: 'response'});
   //return this.http.put <Response> ('http://localhost:54530/api/po'  ,po,{observe: 'response'});
   
   // return this.res 
    

  }


public addPo(po:Po)
{

 // return this.http.post <Response> ('http://localhost:54530/api/po' ,po, {observe: 'response'});

  return this.http.post <Response> ('https://www.elitedistribution.soccer/EliteAPI/api/po'  ,po,{observe: 'response'});


}

public getItemsToNewPo()
{
  
  //return this.http.get('http://localhost:54530/api/po/InitDetails/' + localStorage.getItem("currentUser") );
  return this.http.get('https://www.elitedistribution.soccer/EliteAPI/api/po/Details/' + localStorage.getItem("currentUser") );
}
}
