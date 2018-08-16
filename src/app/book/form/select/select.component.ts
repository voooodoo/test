import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent  {

  @Input() nameControl: string;
  @Input() item: any;
  @Input() form: FormGroup;

  constructor() { }

}
