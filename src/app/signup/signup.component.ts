import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../user.service';  // Ensure you have the correct path for AuthService
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ RouterModule,
             ReactiveFormsModule,
             CommonModule,
             MatCardModule,
             MatFormFieldModule,
             MatInputModule,
             MatButtonModule,
             MatSnackBarModule
           ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form with validation
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        // Custom validator for password match
        validator: this.passwordMatchValidator
      }
    );
  }

  // Accessor to simplify form controls access in the template
  get f() {
    return this.signupForm.controls;
  }

  // Custom Validator to check password match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { mismatch: true };
  }

  // Submit handler
  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const user = {
        UserName: formValue.username,
        Email: formValue.email,
        Password: formValue.password
      };

      this.userService.signup(user).subscribe({
        next: (response) => {
          alert('User registered successfully!');
          this.snackBar.open('Signup Successful!', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/login']);  // Navigate to login after signup
        },
        error: (err) => {
          alert('Error: ' + err.error);
          this.snackBar.open('Failed Signup!', 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
