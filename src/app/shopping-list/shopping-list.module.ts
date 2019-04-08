import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingListEditComponent} from './shopping-list-edit/shopping-list-edit.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
  ]
})
export class ShoppingListModule {

}
