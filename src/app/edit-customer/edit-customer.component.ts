import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerEdit: FormGroup;
  submitted = false;
  id;
  data;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id', this.id);
    this.getData();
    this.getContacts();
  }

  ngOnInit(): void {
    this.customerEdit = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      isGold: ['', Validators.required]
    });
  }

  getData() {
    const apiUrl = 'http://localhost:3000/api/customers/' + this.id;
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    };
    return this.http
      .get(apiUrl, httpOptions)
      .pipe(map(response => this.data = response));
  }

  getContacts() {
    this.getData().subscribe(data => {
      console.log('data', data);
      this.data = data;
    });
  }

  editCustomer(form: FormGroup) {
    console.log('form', form.value);
    this.submitted = true;
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    };
    this.http.put('http://localhost:3000/api/customers/' + this.id, form.value, httpOptions)
      .subscribe(data => {
          console.log('data', data);
          this.router.navigate(['customer']);
        },
        error => {
          console.log(error);
        });
  }
}
