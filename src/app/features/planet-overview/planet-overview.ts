import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Planets } from '../../core/planets';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-planet-overview',
  imports: [RouterLink],
  templateUrl: './planet-overview.html',
  styleUrl: './planet-overview.scss',
})
export class PlanetOverview {
  private service = inject(Planets);
  private router = inject(Router);

  planetName = input.required<string>();

  constructor() {
    effect(() => {
      if (!this.service.planets.includes(this.planetName())) {
        this.router.navigate(['earth']);
      }
    });
  }

  section = signal<'overview' | 'structure' | 'geology'>('overview');

  planet = computed(() => {
    return this.service
      .planetsData()
      .filter((p) => p.name.toLowerCase() === this.planetName().toLowerCase())[0];

    // Add Empty Error
  });

  // Helpers Start

  mainImg = computed(() => {
    let link = `assets/images/planets/${this.planetName()}/`;

    switch (this.section()) {
      case 'structure':
        return link + `planet-${this.planetName()}-internal.svg`;
      default:
        return link + `planet-${this.planetName()}.svg`;
    }
  });

  surfaceImg = computed(
    () =>
      `assets/images/planets/${this.planetName().toLowerCase()}/geology-${this.planetName().toLowerCase()}.png`,
  );

  mainImgAltText = computed(
    () =>
      `Image of ${this.planetName()[0].toUpperCase() + this.planetName().slice(1).toLowerCase()} ${this.section()}.`,
  );

  surfaceImgAltText = computed(
    () =>
      `Surface image of ${this.planetName()[0].toUpperCase() + this.planetName().slice(1).toLowerCase()} ${this.section()}.`,
  );

  textContent = computed(() => this.planet()?.[this.section()]?.content);

  wikipediaLink = computed(() => this.planet()?.[this.section()]?.source);

  // Helpers End
}
