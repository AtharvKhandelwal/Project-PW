import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { trigger, state, style, transition, animate } from '@angular/animations';

// ✅ Import your interceptor
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor // ✅ Token interceptor registered globally
      ])
    ),
    provideToastr({ closeButton: true })
  ]
};

// ✅ Animation setup for route transitions
export const slideInAnimation = trigger('routeAnimations', [
  state('void', style({ opacity: 0, transform: 'translateX(-100%)' })),
  state('*', style({ opacity: 1, transform: 'translateX(0)' })),
  transition(':enter', animate('300ms ease-in')),
  transition(':leave', animate('300ms ease-out'))
]);
