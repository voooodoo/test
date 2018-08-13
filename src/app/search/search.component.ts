import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers:[HttpService]
})
export class SearchComponent implements OnInit {

  urlFormats: string;
  formatsData: any[];

  searchForm:FormGroup;

  constructor(private fb:FormBuilder, private httpService: HttpService) {
    this.urlFormats = 'http://localhost:3004/formats';
   }

  ngOnInit() {
    this.httpService.getData(this.urlFormats).subscribe((data:any[]) => this.storeFormatsData(data) );

    this.searchForm = this.fb.group({
      format:['']
    })
  }

  storeFormatsData (data) {
    this.formatsData = data;
  }

}
