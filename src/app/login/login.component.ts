import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AuthenticationService } from '../_services/authentication/authentication.service';

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    loading = false;
    error = '';
    loginuserForm: FormGroup;
    userName: FormControl;
    password: FormControl;
    errorMsg: string;

    constructor(private router: Router,
        private authenticationService: AuthenticationService) {
        this.logincreateForm();
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

    }

    private logincreateForm() {
        this.loginuserForm = new FormGroup({
            userName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
        });
    }
  

    login() {
        // this.loading = true;
        this.authenticationService.login(this.loginuserForm.get('userName').value,
            this.loginuserForm.get('password').value)
            .subscribe(
            result => {
                this.error = '';
                if (result) {
                this.router.navigate(['/home']);
                } else {
                    this.error = 'Invalid Username or Password!!';
                    this.router.navigate(['/login']);
                }
            },
);
    }

}
