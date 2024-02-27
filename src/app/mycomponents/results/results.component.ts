import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { CustomerService } from '../../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  
    customers: Customer[];

    constructor(private customerService: CustomerService, private router: Router){

    }

    refreshList(){
      this.getCustomers();
    }

    ngOnInit(): void {
      this.getCustomers();
    }

    private getCustomers(){
      this.customerService.getCustomerList().subscribe(data => {
        this.customers = data;
      });
    }
    
    update(id: number){
      console.log("update");
      this.router.navigate(['update-flight',id]);
    }

    delete(id: number){
      console.log("delete");
      this.customerService.deleteCustomer(id).subscribe(data =>{
        this.getCustomers();
      })
    }
}
