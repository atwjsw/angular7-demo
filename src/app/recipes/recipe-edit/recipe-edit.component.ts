import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../receipt.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params.id;
      if (id) {
        this.recipe = this.recipeService.getRecipe(id);
        this.editMode = true;
      }
      console.log(this.editMode);
    });
  }
}
