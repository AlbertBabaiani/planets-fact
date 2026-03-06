import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { filter } from 'rxjs';
import { Planets } from './core/planets';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('planets-fact');

  private service = inject(Planets);
  isLoading = this.service.isLoading;

  private router = inject(Router);

  bgX = signal<number>(0);
  bgY = signal<number>(0);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.bgX.set(Math.floor(Math.random() * 100));
      this.bgY.set(Math.floor(Math.random() * 100));
    });
  }
}
