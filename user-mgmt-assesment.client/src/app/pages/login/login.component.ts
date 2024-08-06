import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpHelperService } from '../../services/http-helper.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private httpService: HttpHelperService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  showError: boolean = false;

  formSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid){
      console.log(this.loginForm);
      this.showError = true;
      return;
    }

    this.httpService
      .httpPost(
        `login`,
        this.loginForm.value
      )
      .pipe(finalize(() => {}))
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token),
            this.router.navigateByUrl('/user/create');
        },
        error: (err) => console.log,
      });
  }
}

