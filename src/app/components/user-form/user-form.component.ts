import { Component, OnInit } from '@angular/core';
import {MatError, MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { FormSettings } from '../../models/formSettings.model';
import { emailExistsValidator } from '../../validators/custom-validators';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-user-form',
  imports: [MatError,MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, MatOptionModule, CommonModule],
  templateUrl: './user-form.component.html',
  
  styleUrls: ['./user-form.component.css'],
  
})
  export class UserFormComponent implements OnInit  {
  formSettings: FormSettings | undefined;

    constructor(private userService: UserService, private http: HttpClient) {}
employeeForm!: FormGroup;
trackByValue = (_: number, option: { value: string }) => option.value;


    ngOnInit() {
this.employeeForm = new FormGroup({
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
      email: new FormControl('',    {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailExistsValidator(this.userService)],
      updateOn: 'blur'
    }),
      countryCode: new FormControl('', { validators: [Validators.required] }),
      phone: new FormControl('', { validators: [Validators.required] }),

      // Personal
      birthDate: new FormControl(null, { validators: [] }),
      nationalId: new FormControl('', { validators: [Validators.required] }),
      jobNumber: new FormControl('', { validators: [] }),
      gender: new FormControl('male', { validators: [Validators.required] }),
      maritalStatus: new FormControl('', { validators: [Validators.required] }),

      // Address
      addressAr: new FormControl('', { validators: [] }),
      addressEn: new FormControl('', { validators: [] }),
    });

      
        this.userService.getFormSettings().subscribe({
    next: (settings: FormSettings) => {
      this.formSettings = settings;
      console.log(this.formSettings);
    },
    error: (err: any) => console.error('Error loading form settings:', err)
  });
}
 

  onSubmit() {
       if (this.employeeForm.valid) {
      const newUser: User = this.employeeForm.value as User;
      console.log(newUser);
      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          alert('User added successfully!');
          this.employeeForm.reset();
        },
        error: (err) => {
          console.error('Error adding user:', err);
          alert('Failed to add user');
        }
      });
    } else {
      alert('Please fill in required fields');
    }
  }
}


