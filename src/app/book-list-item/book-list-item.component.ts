import { Component, Input } from '@angular/core';
import { Book } from '../model/book'

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html'
})
export class BookListItem {

  @Input() book:Book;

  constructor() { }
}
