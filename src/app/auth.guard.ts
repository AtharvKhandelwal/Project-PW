
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedIn()) {
    return true;
  } else {
    const snackBar = inject(MatSnackBar);
    snackBar.open('Login Required!!!', 'Close', {
      duration: 5000,
    });
    router.navigate(['/login']);
    return false;
  }
};
