import { Routes } from '@angular/router';
import { PlanetOverview } from './features/planet-overview/planet-overview';

export const routes: Routes = [
  {
    path: ':planetName',
    component: PlanetOverview,
  },
  {
    path: '**',
    redirectTo: 'earth',
    pathMatch: 'full',
  },
];
