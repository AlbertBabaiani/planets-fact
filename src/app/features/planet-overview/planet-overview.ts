import { Component, computed, inject, input } from '@angular/core';
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

  planet = computed(() => {
    return this.service
      .planetsData()
      .filter((p) => p.name.toLowerCase() === this.planetName().toLowerCase())[0];

    // Add Empty Error
  });
}
