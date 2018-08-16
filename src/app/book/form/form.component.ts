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
hasFormInit:boolean = false;
form: FormGroup;

data = {
  books: {
    url: '',
    data: []
  },
  formats: {
    url: '',
    data:[]
  },
  countries: {
    url: '',
    data:[]
  }, 
  cities: {
    url: '',
    data:[]
  }, 
  companies: {
    url: '',
    data:[]
  } 
}

  constructor(private fb:FormBuilder, private httpService: HttpService) {
    this.data.books.url = 'http://localhost:3004/books';
    this.data.formats.url = 'http://localhost:3004/formats';
    this.data.countries.url = 'http://localhost:3004/countries';
    this.data.cities.url = 'http://localhost:3004/cities';
    this.data.companies.url = 'http://localhost:3004/companies'
  }

  ngOnInit() {
    for(let item in this.data) {
      let elem = this.data[item];
      this.httpService.getData(elem.url).subscribe((data:any[]) => this.setData(elem, data))
    }

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
  
  setData(target, data) {
    target.data = data;
    if(this.id && !this.hasFormInit) {
      let hasAllData = true;
      
      for(let item in this.data) {
        if(this.data[item].data.length==0) {
          hasAllData = false;
        }    
      }

      if(hasAllData) {
        this.hasFormInit = true;
        this.setFormValue(this.id);
      }
    }
  }

  setFormValue(id){
      --id;
      let book = this.data.books.data[id];
      this.form.controls['author'].setValue(book.author);
      this.form.controls['title'].setValue(book.title);
      this.form.controls['isbn'].setValue(book.isbn);
      this.form.controls['pages'].setValue(book.pages);
      this.form.controls['description'].setValue(book.description);
      this.form.controls['price'].setValue(book.price);
      
      let formatId = this.data.books.data[id].formatId;
      let format = this.data.formats.data[formatId-1].name;
      this.form.controls['Format'].setValue(format);
      
      let countryId = this.data.books.data[id].countryId;
      let country = this.data.countries.data[countryId-1].name;  
      this.form.controls['Country'].setValue(country);
      
      let cityId = this.data.books.data[id].cityId;
      let city = this.data.cities.data[cityId-1].name;
      this.form.controls['City'].setValue(city);

      let companyId = this.data.books.data[id].companyId;
      let company = this.data.companies.data[companyId-1].name;
      this.form.controls['Company'].setValue(company);
  }

  onSubmit(form) {
    console.log(form);
  }
}
