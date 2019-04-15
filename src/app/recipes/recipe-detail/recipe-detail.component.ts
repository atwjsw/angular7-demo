import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Recipe} from '../recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';
import {RecipeService} from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params.id);
    });
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    // this.router.navigate(['../', this.recipe.id, 'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['../', {relativeTo: this.route}]);
  }
}
