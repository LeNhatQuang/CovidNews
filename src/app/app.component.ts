import { NewDetail } from './models/new-detail.model';
import { Country } from './models/country.model';
import { NewService } from './services/new.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NewService]
})
export class AppComponent {
  title = 'CovidNews';

  selectedCountry: Country;

  countries: Country[];

  details: NewDetail[];

  div_visible: boolean = false;

  constructor(private newService: NewService) {
    this.newService.getCountries().subscribe(response => {
      this.countries = response;
    }, error => {
      console.error('Request failed with error')
      console.log(error);
    });
  }

  onChangeDropdown(event) {
    if (this.selectedCountry) {
      this.div_visible = true;
      setTimeout(() => {
        this.div_visible = false;
      }, 5000);

      this.newService.getAllStatusByCountry(this.selectedCountry).subscribe(response => {
        this.details = response;
      }, error => {
        console.error('Request failed with error')
        console.log(error);
      });
    }
  }
}
