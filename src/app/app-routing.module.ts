// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlogComponent } from './blog/blog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AddblogpostComponent } from './addblogpost/addblogpost.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Define other routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'blog/:id', component: BlogComponent },
  { path: 'dashboard', component: DashboardComponent },
  // {
  //   path: 'add-blogpost/:id',
  //   component: AddblogpostComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
