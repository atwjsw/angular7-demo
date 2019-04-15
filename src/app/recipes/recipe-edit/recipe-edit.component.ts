import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params.id;
      if (id) {
        this.recipe = this.recipeService.getRecipe(id);
        this.editMode = true;
      }
      this.initForm();
    });
  }

  private initForm() {
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.recipe.ingredients.forEach((ingredient) => {
        recipeIngredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
        }));
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(this.editMode ? this.recipe.name : null, Validators.required),
      imagePath: new FormControl(this.editMode ? this.recipe.imagePath : null, Validators.required),
      description: new FormControl(this.editMode ? this.recipe.description : null, Validators.required),
      ingredients: recipeIngredients
    });
  }

  addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    }));
  }

  onSubmit() {
    console.log('submitted', this.recipeForm);
    const recipe = new Recipe(
      null,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients);
    if (this.editMode) {
      recipe.id = this.recipe.id;
      this.recipeService.updateRecipe(recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
