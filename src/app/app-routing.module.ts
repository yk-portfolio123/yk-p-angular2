import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { GroupComponent } from './component/group/group.component';
import { DetailComponent } from './component/detail/detail.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component : LoginComponent},
  {path: 'main',component: MainComponent,canActivate:[AuthGuard]},
  {path: ':category',component: GroupComponent,canActivate:[AuthGuard]},
  {path: ':category/:id',component: DetailComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
