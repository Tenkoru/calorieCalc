import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  callForm: FormGroup;
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

  createItem(): FormGroup {
    return this.formBuilder.group({
      nameLabel: 'Ингредиент',
      name: '',
      weightLabel: 'Вес',
      weight: '',
      caloriesLabel: 'Каллории',
      calories: '',
    });
  }

  addItem(): void {
    this.ingredients = this.callForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createItem());
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.callForm = this.formBuilder.group({
        ingredients: this.formBuilder.array([this.createItem()]),
    });
  }

}
