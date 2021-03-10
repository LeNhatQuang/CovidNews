import { NewService } from './services/new.service';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { AppComponent } from './app.component';
import { Country } from './models/country.model';
import { of } from "rxjs";

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        AccordionModule,
        DropdownModule,
        TableModule,
        PaginatorModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it(`should have as title 'CovidNews'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CovidNews');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  let httpClientSpy: { get: jasmine.Spy };
  let newService: NewService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    newService = new NewService(httpClientSpy as any);
  });

  it('should return expected countries', () => {
    const expectedCountries: Country[] =
      [{ ISO2: 'a1', Slug: 'a', Country: 'A' }, { ISO2: 'b1', Slug: 'b', Country: 'B' }];

    httpClientSpy.get.and.returnValue(of(expectedCountries));

    newService.getCountries().subscribe(
      countries => expect(countries).toEqual(expectedCountries));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue(of(errorResponse));
  
    newService.getCountries().subscribe(
      countries => fail('expected an error, not countries'),
      error  => expect(error.message).toContain('test 404 error')
    );
  });
})
