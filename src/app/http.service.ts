import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
  
@Injectable()
export class HttpService{
  
    
    constructor(private http: HttpClient){ }
      
    getData(url){
        return this.http.get(url, {
            headers: new HttpHeaders({
              'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'
            })
        })
    }
}