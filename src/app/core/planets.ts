import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Planets {
  readonly planets: string[] = [
    'mercury',
    'venus',
    'earth',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
  ];
}
