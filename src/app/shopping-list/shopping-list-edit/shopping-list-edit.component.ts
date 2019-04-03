import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    this.ingredientAdded.emit(
      new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value));
  }

  onClear() {
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }
}
