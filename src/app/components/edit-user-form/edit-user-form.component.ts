import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { uniqueEmailExceptSelf } from '../../validators/custom-validators';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-edit-user-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
   
  ],

  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserFormComponent {
user!: User;
  private originalEmail = '';
  private userId!: string;
  private originalUser!: User; 
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private users: UserService
  ) {
    this.user = this.route.snapshot.data['user'] as User;
    this.originalEmail = (this.user?.email || '').toLowerCase();
    this.userId = String(this.user.id);
const { id, ...rest } = this.user;
this.originalUser = { ...rest };
    this.form = new FormGroup({
      // Arabic
      arFirst: new FormControl(this.user?.arFirst || '', [Validators.required]),
      arSecond: new FormControl(this.user?.arSecond || ''),
      arMiddle: new FormControl(this.user?.arMiddle || ''),
      arLast: new FormControl(this.user?.arLast || ''),

      // English
      enFirst: new FormControl(this.user?.enFirst || ''),
      enSecond: new FormControl(this.user?.enSecond || ''),
      enMiddle: new FormControl(this.user?.enMiddle || ''),
      enLast: new FormControl(this.user?.enLast || ''),

      // Contact
      email: new FormControl(
        this.user?.email || '',
        { 
          validators: [Validators.required, Validators.email],
          asyncValidators: [uniqueEmailExceptSelf(this.users, this.originalEmail)],
          updateOn: 'blur'
        }
      ),
      countryCode: new FormControl(this.user?.countryCode || 'SAU', [Validators.required]),
      phone: new FormControl(this.user?.phone || '', [Validators.required]),

      // Personal
      birthDate: new FormControl(this.user?.birthDate || null),
      nationalId: new FormControl(this.user?.nationalId || '', [Validators.required]),
      jobNumber: new FormControl(this.user?.jobNumber || ''),
      gender: new FormControl(this.user?.gender || 'male', [Validators.required]),
      maritalStatus: new FormControl(this.user?.maritalStatus || 'single', [Validators.required]),

      // Address
      addressAr: new FormControl(this.user?.addressAr || ''),
      addressEn: new FormControl(this.user?.addressEn || ''),
    });
  }
 onSubmit() {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue() as User;
    const noChanges = JSON.stringify(this.originalUser) == JSON.stringify(payload);
    if (noChanges) {
      alert('No changes detected');
      return;
    }
    this.users.updateUser(this.userId, payload).subscribe({
      next: () => {
        alert('User updated successfully!');
window.location.reload();  },
      error: (e) => {
        console.error(e);
        alert('Failed to update user');
      }
    });
  }

}
