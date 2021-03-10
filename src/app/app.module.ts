import { NewService } from './services/new.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    DropdownModule,
    TableModule,
    PaginatorModule
  ],
  providers: [NewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
