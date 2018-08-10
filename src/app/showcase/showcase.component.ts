import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  providers:[HttpService]
})
export class ShowcaseComponent implements OnInit {
 
  dataBooks:any[]; 

  constructor(private httpService: HttpService) { }
  
  urlBook = 'http://localhost:3004/books';

  ngOnInit() {
    this.httpService.getDataBooks(this.urlBook).subscribe((data:any[]) => this.storeDataBooks(data) );
  }
  storeDataBooks(data) {
    this.dataBooks=data
  }
  addBook(book) {
    console.log(book);
  }



}
