import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConvertPdfToPowerpointComponent} from './convert-pdf-to-powerpoint/convert-pdf-to-powerpoint.component'
import { ConvertPptToPdfComponent } from './convert-ppt-to-pdf/convert-ppt-to-pdf.component';
import { ConvertWORDToPDFComponent } from './convert-word-to-pdf/convert-word-to-pdf.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'pdftopowerpoint', component: ConvertPdfToPowerpointComponent,  canActivate: [authGuard]},
  { path: 'ppttopdf', component: ConvertPptToPdfComponent, canActivate: [authGuard]},
  { path: 'wordtopdf', component: ConvertWORDToPDFComponent, canActivate: [authGuard]}
];
