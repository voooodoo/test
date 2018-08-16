import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers:[HttpService]
})
export class SearchComponent implements OnInit {

  data = {
    books: {
      url: '',
      data: []
    },
    formats: {
      url: '',
      data:[]
    } 
  }
  result = [];
  searchForm:FormGroup;

  constructor(private fb:FormBuilder, private httpService: HttpService) {
    this.data.books.url = 'http://localhost:3004/books';
    this.data.formats.url = 'http://localhost:3004/formats';
   }

  ngOnInit() {
    for(let item in this.data) {
      let elem = this.data[item];
      this.httpService.getData(elem.url).subscribe((data:any[]) => this.setData(elem, data))
    }

    this.searchForm = this.fb.group({
      author: [''],
      title:[''],
      format:[''],
      isbn:[''],
      pageMin: [''],
      pageMax: [''],
      priceMin: [''],
      priceMax: ['']
    })
    this.result = Object.assign([], this.data.books.data); 
    this.searchForm.valueChanges.subscribe((form)=> this.setSearch(form))
  }

  setData(target, data) {
    target.data = data;
    if(target === this.data.books) {
      this.result = this.data.books.data.slice();
    }
  }

  setSearch(form) {
    let books = this.data.books.data;
    this.result = [];
    
    for(let i = 0; i< books.length; i++) {
      if(books[i].author.toLowerCase().indexOf(form.author.toLowerCase())!=-1) {
        if(books[i].title.toLowerCase().indexOf(form.title.toLowerCase())!=-1) {  
          if(books[i].isbn.toLowerCase().indexOf(form.isbn.toLowerCase())!=-1) {
            
            if(form.pageMin||form.pageMax) {
              if(+form.pageMin <= +books[i].pages && +books[i].pages < +form.pageMax) {
                this.result.push(books[i])
              }
            } else if (form.priceMin||form.priceMax) {
              if(+form.priceMin <= +books[i].price && +books[i].price < +form.priceMax) {
                this.result.push(books[i])
              }
            } else {
              this.result.push(books[i])
            }
          }
        }
      }
    } 
  }


}
