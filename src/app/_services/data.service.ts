import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { MemberModal } from '../_services/sports.model';

@Injectable()
export class DataService {

  constructor(private http: Http, private router: Router) { }


  getPlayerData(): Observable<MemberModal>{
    let apiUrl = environment.getPlayerPageURL;
    return this.http.get(apiUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePlayer(mydata) {
    let apiUrl = environment.getPlayerPageURL;
    let data = JSON.stringify(mydata);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  } 

  addPlayer(mydata) {
    let apiUrl = environment.getPlayerPageURL;
    let data = JSON.stringify(mydata);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  } 

  deletePlayer(mydata) {
    console.log(mydata);
    let apiUrl = environment.getPlayerPageURL;
    let data = JSON.stringify(mydata);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }     


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    console.log(error.st);
    // In a real world app, need to use a remote logging infrastructure instead of lgging the errors in browser
    //console.error(errMsg);
    return Observable.throw(error || "Server issue");
  }
}
