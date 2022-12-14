import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Lasanha',
  //     'Fitas colocadas em camadas, e entremeadas com recheio.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lasagne_-_stonesoup.jpg/1024px-Lasagne_-_stonesoup.jpg',
  //     [
  //       new Ingredient('Pasta', 1),
  //       new Ingredient('Ham', 10),
  //       new Ingredient('Cheese', 10),
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Tomato', 3),
  //     ]
  //   ),
  //   new Recipe(
  //     'Estrogonofe',
  //     'Cubos de carne servidos num molho de creme de leite.',
  //     'https://simplelivingrecipes.com/wp-content/uploads/2020/02/Brazilian-Stroganoff--500x500.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Onion', 3),
  //       new Ingredient('Champignon', 10),
  //       new Ingredient('Salt', 1),
  //       new Ingredient('Tomato', 3)
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(i: number) {
    return this.recipes[i];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
