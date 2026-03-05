import { Component, computed, DOCUMENT, effect, inject, input, signal } from '@angular/core';
import { Planets } from '../../core/planets';
import { Router, RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-planet-overview',
  imports: [RouterLink],
  templateUrl: './planet-overview.html',
  styleUrl: './planet-overview.scss',
  animations: [
    trigger('planetAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1 })),
      ]),
    ]),

    trigger('imageTransition', [
      transition('* => structure, structure => *', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),

    trigger('popUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(-50%, 35%) scale(0)' }),
        animate(
          '400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ opacity: 1, transform: 'translate(-50%, 35%) scale(1)' }),
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translate(-50%, 35%) scale(1)' }),

        animate('200ms ease-in', style({ opacity: 0, transform: 'translate(-50%, 35%) scale(0)' })),
      ]),
    ]),
  ],
})
export class PlanetOverview {
  private service = inject(Planets);
  private router = inject(Router);

  private titleService = inject(Title);
  private document = inject(DOCUMENT);

  planetName = input.required<string>();

  constructor() {
    effect(() => {
      const currentPlanet = this.planetName();

      if (!this.service.planets.includes(currentPlanet)) {
        this.router.navigate(['earth']);
        return;
      }

      const formattedName = currentPlanet.charAt(0).toUpperCase() + currentPlanet.slice(1);

      this.titleService.setTitle(`${formattedName} - Planets Fact`);

      const favicon = this.document.getElementById('app-favicon') as HTMLLinkElement;
      if (favicon) {
        favicon.href = `assets/images/planets/${currentPlanet}/planet-${currentPlanet}.svg`;
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
