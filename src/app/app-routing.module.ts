import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: 'results', component: ResultsComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '', component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
