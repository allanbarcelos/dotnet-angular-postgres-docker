import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FooterComponent,
    NgbToastModule
  ]
})
export class AuthModule { }
