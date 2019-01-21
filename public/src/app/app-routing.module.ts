import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovielistComponent } from './movielist/movielist.component';
import { NewmovieComponent } from './newmovie/newmovie.component';
import { ReviewlistComponent } from './reviewlist/reviewlist.component';
import { AddreviewComponent } from './addreview/addreview.component';



const routes: Routes = [
  { path: '', component: MovielistComponent},
  { path: 'movielist', component: MovielistComponent},
  { path: 'newmovie', component: NewmovieComponent},
  { path: 'reviewlist/:id', component: ReviewlistComponent},
  { path: 'addreview/:id', component: AddreviewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
