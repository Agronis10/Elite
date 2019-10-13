import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http:HttpClient) { }

getCurrency()
{
  return this.http.get("http://localhost:54530/api/currency");
}

}
