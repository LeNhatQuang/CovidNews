import { NewDetail } from './models/new-detail.model';
import { Country } from './models/country.model';
import { NewService } from './services/new.service';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit{
  title = 'CovidNews';

  selectedCountry: Country;

  countries: Country[];

  details: NewDetail[];

  constructor(private newService: NewService) {
    
  }

  ngOnChanges() {
    console.log("onchange");
    console.log(this.countries);
  }

  ngOnInit() {
    console.log("onIntit");
    console.log(this.countries);
    this.newService.getCountries().subscribe(response => {
      console.log("set countries");
      this.countries = response;
      console.log(this.countries);
    }, error => {
      console.error('Request failed with error')
      console.log(error);
    });

    if(this.selectedCountry){
      console.log('quang is here');
      console.log(this.selectedCountry);
      this.newService.getAllStatusByCountry(this.selectedCountry).subscribe(response => {
        this.details = response;
        console.log(this.details[0]);
      }, error => {
        console.error('Request failed with error')
        console.log(error);
      });
    }
  }

  onChange(event) {
    console.log('event :');
    console.log(event);
    console.log(event.value);
    console.log("setlected country" + this.selectedCountry.Country);
}
}
