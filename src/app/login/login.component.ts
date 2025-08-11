import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSnackBarModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.matSnackBar.open("Sesion iniciada correctamente", 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        console.log(this.authService.getRoles());
        
        if(this.authService.getRoles()?.includes('Admin')) {
          this.router.navigate(['/admin/dashboard']);
        }else {
          this.router.navigate(['/app/index']);
        }
      },
      error: (error) => {
        this.matSnackBar.open(error.error.message, 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}

