import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers:[HttpService]
})
export class FormComponent implements OnInit {

@Input() id:number;
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
    this.httpService.getData(this.urlFormats).subscribe((data:any[]) => this.storeFormatsData(data) );
    this.httpService.getData(this.urlCountries).subscribe((data:any[]) => this.storeCountriesData(data) );
    this.httpService.getData(this.urlCities).subscribe((data:any[]) => this.storeCitiesData(data) );
    this.httpService.getData(this.urlPublishers).subscribe((data:any[]) => this.storePublishersData(data) ); 
    this.httpService.getData(this.urlBooks).subscribe((data:any[]) => this.storeBooksData(data) );

    this.form = this.fb.group({
      author:[''],
      title:[''],
      isbn:[''],
      pages: [''],
      Format: [''],
      description: [''],
      price: [''],
      Country: [''],
      City: [''],
      Company:[''] 
    })
  }

  storeFormatsData (data) {
    this.formatsData = data;
    if(this.id) {
      let format = this.formatsData[this.id-1];
      this.form.controls['Format'].setValue(format.name);
    }
  }

  storeCountriesData (data) {
    this.countriesData = data;
    if(this.id) {
      let country = this.countriesData[this.id-1];
      this.form.controls['Country'].setValue(country.name);
    }
  }

  storeCitiesData (data) {
    this.citiesData = data;
  }

  storePublishersData (data) {
    this.publishersData = data;
  }

  storeBooksData(data) {
    this.booksData = data;
    if(this.id) {
      let book = this.booksData[this.id-1];
      console.log(book);
      this.form.controls['author'].setValue(book.author);
      this.form.controls['title'].setValue(book.title);
      this.form.controls['isbn'].setValue(book.isbn);
      this.form.controls['pages'].setValue(book.pages);
      this.form.controls['description'].setValue(book.description);
      this.form.controls['price'].setValue(book.price);
    }
  }

  

  onSubmit() {
    console.log(this.form);
  }
}
