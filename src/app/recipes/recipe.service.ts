import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService{

    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(0,'A Test Recipe',
        'This is a test',
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',20)
        ]),
        new Recipe(1,'A Test Recipe 2',
        'This is a test 2',
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)

        ])
      ];
    

      constructor(private shopphingListService : ShoppingListService){};

      getRecipes() {
          return this.recipes.slice();
      }


      
    addIngredientsToShoppingList(ingredients : Ingredient[]) {
       this.shopphingListService.addIngredients(ingredients);
    }


    getRecipe(id: number) : Recipe {
        return this.recipes[id];
    }


    addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe : Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(id:number){
        this.recipes.splice(id,1);
        this.recipeChanged.next(this.recipes.slice());
    }

}