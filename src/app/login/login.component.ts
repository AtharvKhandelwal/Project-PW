import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../user.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [  RouterModule,
              CommonModule,
              ReactiveFormsModule,
              MatCardModule,
              MatFormFieldModule,
              MatInputModule,
              MatButtonModule,
              MatSnackBarModule,
              MatIconModule
            ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      this.userService.login(formValue).subscribe({
        next: (response: any) => {
          this.snackBar.open('Login Successful!', 'Close', { duration: 5000 });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('Error: ' + err.error);
          this.snackBar.open('Failed Login!', 'Close', { duration: 5000 });
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
