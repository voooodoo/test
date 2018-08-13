import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers:[HttpService]
})
export class FormComponent implements OnInit {

@Input() id:any;

urlFormats: string;
formatsData: any[];

urlCountries: string;
countriesData: any;

urlCities: string;
citiesData: any;

urlPublishers: string;
publishersData: any;

urlBooks: string;
booksData: any;

form: FormGroup;
defaultValue:any;

  constructor(private fb:FormBuilder, private httpService: HttpService) {
    this.urlFormats = 'http://localhost:3004/formats';
    this.urlCountries = 'http://localhost:3004/countries';
    this.urlCities = 'http://localhost:3004/cities';
    this.urlPublishers = 'http://localhost:3004/companies';
    this.urlBooks = 'http://localhost:3004/books';
    }

  ngOnInit() {
    this.httpService.getData(this.urlBooks).subscribe((data:any[]) => this.storeBooksData(data) );
    this.httpService.getData(this.urlFormats).subscribe((data:any[]) => this.storeFormatsData(data) );
    this.httpService.getData(this.urlCountries).subscribe((data:any[]) => this.storeCountriesData(data) );
    this.httpService.getData(this.urlCities).subscribe((data:any[]) => this.storeCitiesData(data) );
    this.httpService.getData(this.urlPublishers).subscribe((data:any[]) => this.storePublishersData(data) ); 
    

    this.form = this.fb.group({
      author:['', Validators.required],
      title:['',  Validators.required],
      isbn:['', Validators.required],
      pages: ['',Validators.required],
      Format: ['', Validators.required],
      description: ['',Validators.required],
      price: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
      Company:['', Validators.required] 
    })
  }

  storeFormatsData (data) {
    this.formatsData = data;
    if(this.id) {
      let formatId = this.booksData[this.id-1].formatId;
      let format = this.formatsData[formatId-1].name;
      this.form.controls['Format'].setValue(format);
    }
  }

  storeCountriesData (data) {
    this.countriesData = data;
    if(this.id) {
        let countryId = this.booksData[this.id-1].countryId;
        let country = this.countriesData[countryId-1].name;  
        this.form.controls['Country'].setValue(country);
    }
  }

  storeCitiesData (data) {
    this.citiesData = data;
    if(this.id) {
      let cityId = this.booksData[this.id-1].cityId;
      let city = this.citiesData[cityId-1].name;
      this.form.controls['City'].setValue(city);
    }
  }

  storePublishersData (data) {
    this.publishersData = data;
    if(this.id) {
      let companyId = this.booksData[this.id-1].companyId;
      let company = this.publishersData[companyId-1].name;
      this.form.controls['Company'].setValue(company);
    }
  }

  storeBooksData(data) {
    this.booksData = data;
    if(this.id) {
      let book = this.booksData[this.id-1];
      this.form.controls['author'].setValue(book.author);
      this.form.controls['title'].setValue(book.title);
      this.form.controls['isbn'].setValue(book.isbn);
      this.form.controls['pages'].setValue(book.pages);
      this.form.controls['description'].setValue(book.description);
      this.form.controls['price'].setValue(book.price);
    }
  }
  onSubmit(form) {
    console.log(form);
  }
}
