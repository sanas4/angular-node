import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerAdd: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customerAdd = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      isGold: ['', Validators.required]
    });
  }

  addCustomer(form: FormGroup) {
    console.log('form', form.value);
    this.submitted = true;
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    };
    this.http.post('http://localhost:3000/api/customers', form.value, httpOptions)
      .subscribe(data => {
          console.log('data', data);
          this.router.navigate(['customer']);
        },
        error => {
          console.log(error);
        });
  }
}
