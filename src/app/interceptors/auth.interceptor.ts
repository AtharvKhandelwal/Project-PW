import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Angular 15+ uses function-based interceptors
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  // ✅ Skip token for public auth routes
  if (req.url.includes('/login') || req.url.includes('/signup')) {
    return next(req); // Send request as-is without Authorization header
  }
  // Clone request and add Authorization header if token exists
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized! Redirecting to login...');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};