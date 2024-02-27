import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet , RouterModule} from '@angular/router';
import { FlightSearchComponent } from './mycomponents/flight-search/flight-search.component';
import { NavbarComponent } from './mycomponents/navbar/navbar.component';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import { ResultsComponent } from './mycomponents/results/results.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule, FlightSearchComponent, NavbarComponent, HttpClientModule, ResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Flight Website';
}
