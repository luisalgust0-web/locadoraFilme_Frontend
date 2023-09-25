import { T } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { publishFacade } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Rental } from '../models/rental';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private http : HttpClient, private datePipe : DatePipe) { }
  urlAPI = environment.url + "Rental/";

  public GetRentalsById(customer_id : number) : any{
    var url = this.urlAPI+`GetItem/${customer_id}`;
    return this.http.get(url);
  }

  public GetRentals(customer_id: number , film_id: number | null, dataInicio: Date | null, dataFinal: Date | null) : any{

    var url = this.urlAPI+`GetLista?customerId=${customer_id}`;

    if(film_id){
      var url = `${url}&filmId=${film_id}`;
    }

    if(dataInicio){
      var dataFormatada = this.datePipe.transform(dataInicio, 'yyyy-MM-ddTHH:mm:ss');
      var url = `${url}&dataInicio=${dataFormatada}`;
    }

    if(dataFinal){
      var dataFormatada = this.datePipe.transform(dataFinal, 'yyyy-MM-ddTHH:mm:ss');
      var url = `${url}&dataFinal=${dataFormatada}`;
    }


    return this.http.get<Rental[]>(url);
  }

  public AddRental(rental_id : number,rental_date : Date,inventory_id : number,customer_id : number,staff_id : number,last_update : Date,forecast_date : Date, situacao : number) : any{
    var props = {
      "Rental_id" : rental_id,
      "Rental_date" : rental_date,
      "Inventory_id" : inventory_id,
      "Customer_id" : customer_id,
      "Staff_id" : staff_id,
      "Last_update" : last_update, 
      "Forecast_date": forecast_date,
      "Situacao" : situacao
    }

    var url = this.urlAPI+"AddItem";

    return this.http.post(url,props);
  }

  public UpdateRental(rental_id : number, rental_date : Date, inventory_id : number, customer_id : number, return_date : Date | null, staff_id : number, last_update : Date, forecast_date : Date, situacao : number
  ){
    var props = {
      "Rental_id" : rental_id,
      "Rental_date" : rental_date,
      "Inventory_id" : inventory_id,
      "Customer_id" : customer_id,
      "Return_date" : return_date,
      "Staff_id" : staff_id,
      "Last_update" : last_update,
      "Forecast_date": forecast_date,
      "Situacao" : situacao
    }

    var url = this.urlAPI+"UpdateItem";

    return this.http.post(url,props); 

  }
}
