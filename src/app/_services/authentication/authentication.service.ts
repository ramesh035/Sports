import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {
    public token: string;
    public isAuthenticated: boolean;
     private role:string;

    constructor(private http: Http, private _router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.isAuthenticated = false;
    }

    login(username: string, password: string): Observable<boolean> {
        let apiUrl = environment.loginPageURL;
        return this.http.get(apiUrl, JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if (response.json().username == username && response.json().password == password) {
                    let token = response.json() && response.json().token;
                    if (token) {
                        this.role = response.json().role;
                        this.token = token;
                        sessionStorage.setItem('currentUser', JSON.stringify({ username: username,role: this.role, token: token }));
                        this.isAuthenticated = true;
                        return true;
                    } else {
                        this.isAuthenticated = false;
                        return false;
                    }
                } else {
                    this.isAuthenticated = false;
                    return false;
                }

            })
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }

    isUserAuthenticated() {
        if (this.isAuthenticated == false) {
            this._router.navigate(['login']);
        }
        return this.isAuthenticated;
    }

    setTokenAsNull() {
        this.token = null;
    }

    clearLocalStorage() {
        sessionStorage.removeItem('currentUser');
    }

    getUserId() {
        return this.getUserId;
    }

}
