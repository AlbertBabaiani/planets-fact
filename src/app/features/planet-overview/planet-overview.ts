import { Component, computed, inject, input, signal } from '@angular/core';
import { Planets } from '../../core/planets';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-planet-overview',
  imports: [RouterLink],
  templateUrl: './planet-overview.html',
  styleUrl: './planet-overview.scss',
})
export class PlanetOverview {
  private service = inject(Planets);

  planetName = input.required<string>();

  section = signal<'overview' | 'structure' | 'geology'>('overview');

  planet = computed(() => {
    return this.service
      .planetsData()
      .filter((p) => p.name.toLowerCase() === this.planetName().toLowerCase())[0];

    // Add Empty Error
  });

  // Helpers Start

  getMainImg(): string {
    let link = `assets/images/planets/${this.planetName()}/`;

    switch (this.section()) {
      case 'structure':
        return link + `planet-${this.planetName()}-internal.svg`;
      default:
        return link + `planet-${this.planetName()}.svg`;
    }
  }

  getSurfaceImg(): string {
    return `assets/images/planets/${this.planetName().toLowerCase()}/geology-${this.planetName().toLowerCase()}.png`;
  }

  getAltText(): string {
    return `Image of ${this.planetName()[0].toUpperCase() + this.planetName().slice(1).toLowerCase()} ${this.section()}.`;
  }

  getTextContent(): string {
    return this.planet()?.[this.section()]?.content;
  }

  getWikipediaLink(): string {
    return this.planet()?.[this.section()]?.source;
  }

  // Helpers End
}
