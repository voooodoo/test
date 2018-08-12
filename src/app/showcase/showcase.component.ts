import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';
import { Book } from '../classes/book';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  providers:[HttpService]
})
export class ShowcaseComponent implements OnInit {
 
  urlBook: string;
  dataBooks:Book[]; 

  constructor(private httpService: HttpService) { 
    this.urlBook = 'http://localhost:3004/books'; 
  }
  
  ngOnInit() {
    this.httpService.getData(this.urlBook).subscribe((data:Book[]) => this.storeDataBooks(data) );
  }

  storeDataBooks(data) {
    this.dataBooks=data
  }

  addBook(book) {
    console.log(book);
  }
}
