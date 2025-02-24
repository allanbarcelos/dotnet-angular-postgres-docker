import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListComponent } from './pages/list/list.component';
import { StatsComponent } from './pages/stats/stats.component';


@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
