import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
        1,
      'Tasty Schnitzel', '' +
      'A super-tasty Schnitzel - just awesome!',
      'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      2,
      'Big Fat Burger',
      'What else you need to say?',
      'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
        ]
    ),
    new Recipe(
      3,
      'A Test Recipe3',
      'This is a recipe',
      'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find(recipe => (recipe.id === id));
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
  }

  private getId() {
    if (this.recipes.length === 0) {
      return 1;
    }
    return this.recipes.map((r) => r.id).reduce((a, b) => a > b ? a : b) + 1;
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.getId();
    console.log('before add', this.recipes);
    this.recipes.push(recipe);
    console.log('after add', this.recipes);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex((r) => r.id === recipe.id);
    if (index > -1) {
      this.recipes[index] = recipe;
      this.recipeChanged.next(this.recipes.slice());
    }
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex((r) => r.id === id);
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
