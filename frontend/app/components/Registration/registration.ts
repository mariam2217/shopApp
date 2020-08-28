import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService, AuthenticationService } from '../_services';
import {OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './registration.html',
  styleUrls: ['./registration.styl']
})

export class RegistrationComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        // private authenticationService: AuthenticationService,
        // private userService: UserService
    ) {
      this.error = '';
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
      return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        // this.userService.register(this.registerForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //          this.router.navigate(['/login'], { queryParams: { registered: true }});
        //         },
        //         error => {
        //             this.error = error;
        //             this.loading = false;
        //         });
    }
}
