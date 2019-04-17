import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {RecipeService} from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService ) {}

  storeRecipes() {
    // const token = this.authService.getToken();
    // return this.httpClient.put('https://ng-recipe-book-f5071.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());

    return this.httpClient.put('https://ng-recipe-book-f5071.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    // const token = this.authService.getToken();
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-f5071.firebaseio.com/recipes.json?auth=' + token)
    //   .subscribe(
    //     (recipes) => this.recipeService.setRecipes(recipes),
    //     error => console.log(error)
    //   );
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-f5071.firebaseio.com/recipes.json')
      .subscribe(
        (recipes) => this.recipeService.setRecipes(recipes),
        error => console.log(error)
      );
  }
}
