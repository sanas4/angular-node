import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api/customers';
  data;

  constructor(private http: HttpClient) {
    this.getData();
    this.getContacts();
  }

  ngOnInit(): void {
  }

  getData() {
    return this.http.get(this.apiUrl)
      .pipe(map((res: Response) => this.data = res));
  }

  getContacts() {
    this.getData().subscribe(data => {
      console.log('data', data);
      this.data = data;
    });
  }

  deleteCustomer(id) {
    console.log('id', id);
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    };

    this.http.delete('http://localhost:3000/api/customers/' + id, httpOptions)
      .subscribe(data => {
          console.log('data', data);
        },
        error => {
          console.log(error);
        });
  }
}
