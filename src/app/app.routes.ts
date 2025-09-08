import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserResolver } from './resolvers/user.resolver';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';

export const routes: Routes = [
  {path:'users/add', component:UserFormComponent},
  {path:'users/:id/edit', component: EditUserFormComponent,resolve: {user:UserResolver}}
];
