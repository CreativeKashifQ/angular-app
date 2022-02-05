import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './PopupliveComponents/Account/login/login.component'
import { RegisterComponent } from './PopupliveComponents/Account/register/register.component';
import { DashboardComponent } from './PopupliveComponents/dashboard/dashboard.component';
import { ProfileComponent } from './PopupliveComponents/Account/profile/profile.component';
import { SettingsComponent} from './PopupliveComponents/Account/settings/settings.component'
import { EditProfileComponent} from './PopupliveComponents/Account/edit-profile/edit-profile.component'
import { ChangePasswordComponent } from './PopupliveComponents/Account/change-password/change-password.component';
import { EventsComponent } from './PopupliveComponents/events/events.component';
import { VerifyEmailComponent } from './PopupliveComponents/Account/verify-email/verify-email.component'




const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'settings', component:SettingsComponent},
  { path: 'edit-profile', component:EditProfileComponent},
  { path: 'change-password', component:ChangePasswordComponent},
  { path: 'my-events', component: EventsComponent},
  { path: 'verify-email',component:VerifyEmailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
