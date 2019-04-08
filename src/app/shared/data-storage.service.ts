import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/receipt.service';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-f5071.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://ng-recipe-book-f5071.firebaseio.com/recipes.json')
      // .pipe(
      //   map((recipes: Recipe[]) => {
      //     console.log('map', recipes);
      //     recipes.forEach((r) => {
      //       if (!r.ingredients) {
      //         r.ingredients = [];
      //       }
      //       return recipes;
      //     });
      //   })
      // )
  .subscribe(
    (res: Recipe[]) => this.recipeService.setRecipes(res),
        error => console.log(error)
      );
  }
}
