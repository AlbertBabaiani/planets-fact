import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  isLoading = signal<boolean>(true);

  constructor() {
    this.preloadImages().then(() => {
      setTimeout(() => this.isLoading.set(false), 500);
    });
  }

  private async preloadImages(): Promise<void> {
    const promises: Promise<void>[] = [];

    this.planets.forEach((planet) => {
      const urls = [
        `assets/images/planets/${planet}/planet-${planet}.svg`,
        `assets/images/planets/${planet}/planet-${planet}-internal.svg`,
        `assets/images/planets/${planet}/geology-${planet}.png`,
      ];

      urls.forEach((url) => {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        promises.push(promise);
      });
    });

    await Promise.all(promises);
  }
}
