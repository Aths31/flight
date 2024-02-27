import { Routes } from '@angular/router';
import { FlightSearchComponent } from './mycomponents/flight-search/flight-search.component';
import { ResultsComponent } from './mycomponents/results/results.component';
import { UpdateFlightComponent } from './mycomponents/update-flight/update-flight.component';

export const routes: Routes = [
    {path: "flight", component: FlightSearchComponent},
    {path: "flight-list", component: ResultsComponent},
    {path: "update-flight/:id", component: UpdateFlightComponent},
    {path: "", redirectTo:"flight", pathMatch: "full"}
];
