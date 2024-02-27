import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseURL = "http://localhost:8081/api/v1/customers"
  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseURL}`);
  }

  createCustomer(customer: Customer): Observable<Object>{
    return this.http.post(`${this.baseURL}`,customer);
  }

  getCustomerById(id: number): Observable<Customer>{
    return this.http.get<Customer>(`${this.baseURL}/${id}`);
  }

  updateCustomer(customer: Customer): Observable<object>{
    return this.http.put(`${this.baseURL}/${customer.id}`,customer);
  }

  deleteCustomer(id: number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
