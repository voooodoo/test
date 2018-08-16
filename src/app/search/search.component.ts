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
  }

  setData(target, data) {
    target.data = data;
  }
}
