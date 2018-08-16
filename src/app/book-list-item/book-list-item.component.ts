import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../classes/book'

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html'
})
export class BookListItem implements OnInit {

  @Input() book:Book;

  constructor() { }

  ngOnInit() {
  }

}
