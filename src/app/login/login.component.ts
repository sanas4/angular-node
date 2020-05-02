import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  checkLogIn(form: FormGroup) {
    this.submitted = true;
    this.http.post('http://localhost:3000/api/auth', form.value, {
      responseType: 'string'
    })
      .subscribe(data => {
          console.log('data', data);
          localStorage.setItem('token', data);
          this.router.navigate(['customer']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
