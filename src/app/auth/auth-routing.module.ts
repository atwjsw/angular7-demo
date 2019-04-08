import {NgModule} from '@angular/core';
import {SingupComponent} from './singup/singup.component';
import {SinginComponent} from './singin/singin.component';
import {RouterModule, Routes} from '@angular/router';

const authRoutes: Routes = [
  { path: 'signup', component: SingupComponent },
  { path: 'signin', component: SinginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
