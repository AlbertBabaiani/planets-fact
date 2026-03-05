import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Planet } from '../shared/planet';

@Injectable({
  providedIn: 'root',
})
export class Planets {
  private http = inject(HttpClient);
  private dataUrl = 'assets/data.json';

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

  planetsData = toSignal(this.http.get<Planet[]>(this.dataUrl), { initialValue: [] });
}
