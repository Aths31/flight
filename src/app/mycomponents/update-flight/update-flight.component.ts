import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Customer } from '../../customer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-flight',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './update-flight.component.html',
  styleUrl: './update-flight.component.css'
})
export class UpdateFlightComponent implements OnInit {

  id: number;
  numberOfAdults: number;
  numberOfInfants: number;
  numberOfChildren: number;
  totalTravellers: number;
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
    if(this.customer.travelers<9)this.customer.travelers=(++this.customer.adults)+this.customer.children+this.customer.infants;
  }

  decreaseAdults(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.customer.adults>1)this.customer.travelers = (--this.customer.adults)+this.customer.children+this.customer.infants;
  }

  increaseChildren(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.customer.travelers<9)this.customer.travelers=this.customer.adults+(++this.customer.children)+this.customer.infants;
  }

  decreaseChildren(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.customer.children>0)this.customer.travelers =this.customer.adults+(--this.customer.children)+this.customer.infants;
  }

  increaseInfants(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.customer.travelers<9 && this.customer.adults>this.customer.infants)this.customer.travelers=this.customer.adults+this.customer.children+(++this.customer.infants);
  }

  decreaseInfants(event: Event){
    event.stopPropagation();
    event.preventDefault();
    if(this.customer.infants>0)this.customer.travelers =this.customer.adults+this.customer.children+(--this.customer.infants);
  }
  
  classSelection(colEvent: any){
    this.customer.travelersClass= colEvent.target.value;
  }

  citySwitcher(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.temp = this.customer.toCity;
    this.customer.toCity = this.customer.fromCity;
    this.customer.fromCity = this.temp;
  }

  saveFlight(){
    return this.customerService.updateCustomer(this.customer).subscribe( data => {
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
    this.customer = data;
    }, error => console.log(error));
  }

  backButton(){
    this.router.navigate(['/flight-list']);
  }

}
