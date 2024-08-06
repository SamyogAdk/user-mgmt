import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpHelperService } from '../../services/http-helper.service';
import { finalize } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  status: any = [
    { text: 'Open', val: 0 },
    { text: 'Closed', val: 1 },
  ];

  showValidationError: boolean = false;
  isFormSubmitting: boolean = false;

  constructor(private httpService: HttpHelperService, private router: Router) {}
  createUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    status: new FormControl(0, Validators.required),
    designation: new FormControl('', Validators.required),
  });

  formSubmit() {
    this.isFormSubmitting = true;
    this.createUserForm.markAllAsTouched();
    if (this.createUserForm.invalid) {
      this.showValidationError = true;
      return;
    }
    let request = this.createUserForm.value;
    request.status = Number(request.status);
    this.httpService
      .httpPost('user/create', request)
      .pipe(
        finalize(() => {
          this.isFormSubmitting = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('user/view-all');
        },
        error: (err) => console.log,
      });
  }
}
