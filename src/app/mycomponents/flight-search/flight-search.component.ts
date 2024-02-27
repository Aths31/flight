import { Component, BootstrapOptions, OnInit} from '@angular/core';
import bootstrap from '../../../main.server';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../customer';
import { error, log } from 'console';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent{

  id: number;
  numberOfAdults: number = 1;
  numberOfInfants: number = 0;
  numberOfChildren: number = 0;
  totalTravellers: number = 1;
  travellersClass: string= "Economy";
  toCity: string;
  fromCity: string;
  temp: string;
  
  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute){
    
  }

  customer: Customer = new Customer();

  increaseAdults(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.totalTravellers<9)this.totalTravellers=(++this.numberOfAdults)+this.numberOfChildren+this.numberOfInfants;
  }

  decreaseAdults(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.numberOfAdults>1)this.totalTravellers = (--this.numberOfAdults)+this.numberOfChildren+this.numberOfInfants;
  }

  increaseChildren(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.totalTravellers<9)this.totalTravellers=this.numberOfAdults+(++this.numberOfChildren)+this.numberOfInfants;
  }

  decreaseChildren(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.numberOfChildren>0)this.totalTravellers =this.numberOfAdults+(--this.numberOfChildren)+this.numberOfInfants;
  }

  increaseInfants(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.totalTravellers<9 && this.numberOfAdults>this.numberOfInfants)this.totalTravellers=this.numberOfAdults+this.numberOfChildren+(++this.numberOfInfants);
  }

  decreaseInfants(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.numberOfInfants>0)this.totalTravellers =this.numberOfAdults+this.numberOfChildren+(--this.numberOfInfants);
  }
  
  classSelection(colEvent: any){
    this.travellersClass= colEvent.target.value;
  }

  citySwitcher(event: Event){
    this.temp = this.customer.toCity;
    this.customer.toCity = this.customer.fromCity;
    this.customer.fromCity = this.temp;
    event.stopPropagation();
    event.preventDefault();
    console.log("switcher");
  }

  saveFlight(){
    this.customer.adults = this.numberOfAdults;
    this.customer.children = this.numberOfChildren;
    this.customer.infants =this.numberOfInfants;
    this.customer.travelers = this.totalTravellers;
    this.customer.travelersClass = this.travellersClass;
    return this.customerService.createCustomer(this.customer).subscribe( data => {
      console.log("successfully"); 
    },
    error => console.log(error));
  }

  goToCustomerList(){
    this.router.navigate(["/flight-list"]);
  }

  onSearch(){
    this.goToCustomerList();
    this.saveFlight();
  }

  

}
