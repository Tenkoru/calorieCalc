import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private storageService: StorageService) {}

  caloriesForm: FormGroup;
  ingredients: FormArray;

  tablewares = [
    {
      name: 'Большая кастрюля',
      weight: 1239,
    },
    {
      name: 'Сковородка',
      weight: 800,
    }
  ];

  labels = {
    name: 'Ингредиент',
    weight: 'Вес',
    calories: 'Каллории',
  };

  result = '';

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      weight: '',
      calories: '',
    });
  }

  addItem(): void {
    this.ingredients.push(this.createItem());
  }

  removeItem(index): void {
    this.ingredients.removeAt(index);
  }

  reset(): void {
    this.caloriesForm.reset();
    this.result = '';
    if (this.ingredients.length > 1) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = this.ingredients.length - 1; i > 0; i--) {
        this.ingredients.removeAt(i);
      }
    }
  }

  calculate() {
    if (this.caloriesForm.valid) {
      const ingredients = this.ingredients.value;
      const tablewareWeight = this.caloriesForm.controls.tableware.value;
      let callSum = 0;
      let weightSum = 0;
      const weightResult = this.caloriesForm.controls.resultWeigth.value;
      ingredients.forEach((ingredient) => {
        callSum += Number(ingredient.calories);
        weightSum += Number(ingredient.weight);
      });
      const caloriesInOneGram = callSum / 100;
      const proportions = weightSum / (weightResult - tablewareWeight);
      this.result = String((caloriesInOneGram * proportions).toFixed(3));
    }
  }

  ngOnInit(): void {
    this.caloriesForm = this.formBuilder.group({
        ingredients: this.formBuilder.array([this.createItem()]),
        resultWeigth: '',
        tableware: '',
    });
    this.ingredients = this.caloriesForm.get('ingredients') as FormArray;
  }

}
