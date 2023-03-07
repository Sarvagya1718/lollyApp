import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  url1='https://api.github.com/users'
  url2='https://api.github.com/search/users'
  getData(){
    return this.http.get(this.url1)
  }

  getSearchData(value:any, page:any){
    if(!value.searchvalue){
      return this.http.get(this.url1+'?per_page=20&page='+page);
    }else{ 
      return this.http.get(this.url2 + '?q=' + value.searchvalue+'&per_page=15&page='+page);
      
  }
}
}
