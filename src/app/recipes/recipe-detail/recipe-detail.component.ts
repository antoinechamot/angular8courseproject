import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id : number;

  constructor(private recipeService : RecipeService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    //this.recipe = this.recipeService.getRecipe(id);
    this.route.params.subscribe(
      (param :Params) => {
        this.id = +param['id'];
        this.recipe = this.recipeService.getRecipe(+param['id']);
      }
    );

  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  
  }
}
