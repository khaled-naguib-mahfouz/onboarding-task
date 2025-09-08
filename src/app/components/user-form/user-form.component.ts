import { ChangeDetectionStrategy,Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  
  styleUrls: ['./user-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
  
  export class UserFormComponent {
    /**
     *
     */
    constructor(private userService: UserService, private http: HttpClient) {
      
    }
  employeeForm = new FormGroup({
      // Arabic names
      arFirst: new FormControl('', { validators: [Validators.required] }),
      arSecond: new FormControl('', { validators: [] }),
      arMiddle: new FormControl('', { validators: [] }),
      arLast: new FormControl('', { validators: [] }),

      // English names
      enFirst: new FormControl('', { validators: [] }),
      enSecond: new FormControl('', { validators: [] }),
      enMiddle: new FormControl('', { validators: [] }),
      enLast: new FormControl('', { validators: [] }),

      // Contact
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      countryCode: new FormControl('SAU', { validators: [Validators.required] }), // default
      phone: new FormControl('', { validators: [Validators.required] }),

      // Personal
      birthDate: new FormControl(null, { validators: [] }),
      nationalId: new FormControl('', { validators: [Validators.required] }),
      jobNumber: new FormControl('', { validators: [] }),
      gender: new FormControl('male', { validators: [Validators.required] }),
      maritalStatus: new FormControl('single', { validators: [Validators.required] }),

      // Address
      addressAr: new FormControl('', { validators: [] }),
      addressEn: new FormControl('', { validators: [] }),
    });


  onSubmit() {
      if (this.employeeForm.valid) {
      const newUser: User = this.employeeForm.value as User;

      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          console.log('✅ User added successfully:', response);
          alert('User added successfully!');
          this.employeeForm.reset(); // clear form
        },
        error: (err) => {
          console.error('❌ Error adding user:', err);
          alert('Failed to add user');
        }
      });
    } else {
      alert('Please fill in required fields');
    }
  }
}


