import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers:[HttpService]
})
export class FormComponent implements OnInit {

urlFormats: string;
formatsData: any[];

urlCountries: string;
countriesData: any;

urlCities: string;
citiesData: any;

urlPublishers: string;
publishersData: any;

form: FormGroup;
defaultValue:any;

  constructor(private fb:FormBuilder, private httpService: HttpService) {
    this.urlFormats = 'http://localhost:3004/formats';
    this.urlCountries = 'http://localhost:3004/countries';
    this.urlCities = 'http://localhost:3004/cities';
    this.urlPublishers = 'http://localhost:3004/companies';
    }

  ngOnInit() {
    this.httpService.getData(this.urlFormats).subscribe((data:any[]) => this.storeFormatsData(data) );
    this.httpService.getData(this.urlCountries).subscribe((data:any[]) => this.storeCountriesData(data) );
    this.httpService.getData(this.urlCities).subscribe((data:any[]) => this.storeCitiesData(data) );
    this.httpService.getData(this.urlPublishers).subscribe((data:any[]) => this.storePublishersData(data) ); 
    
    let fieldsCtrls = {};
    fieldsCtrls['author'] = this.fb.control ('', Validators.required);
    fieldsCtrls['title'] = this.fb.control('', Validators.required);
    fieldsCtrls['isbn'] = this.fb.control('', Validators.required);
    fieldsCtrls['pages'] = this.fb.control('', Validators.required);
    fieldsCtrls['Format'] = this.fb.control('', Validators.required);
    fieldsCtrls['description'] = this.fb.control('', Validators.required);
    fieldsCtrls['price'] = this.fb.control('', Validators.required);
    fieldsCtrls['Country'] = this.fb.control('', Validators.required);
    fieldsCtrls['City'] = this.fb.control('', Validators.required);
    fieldsCtrls['Company'] = this.fb.control('', Validators.required);
    this.form = this.fb.group(fieldsCtrls);
  }

  storeFormatsData (data) {
    this.formatsData = data;
  }

  storeCountriesData (data) {
    this.countriesData = data;
  }

  storeCitiesData (data) {
    this.citiesData = data;
  }

  storePublishersData (data) {
    this.publishersData = data;
  }

  onSubmit() {
    console.log(this.form);
  }
}
