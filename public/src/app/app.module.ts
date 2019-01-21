import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MovielistComponent } from './movielist/movielist.component';
import { NewmovieComponent } from './newmovie/newmovie.component';
import { ReviewlistComponent } from './reviewlist/reviewlist.component';
import { AddreviewComponent } from './addreview/addreview.component';


@NgModule({
    declarations: [
        AppComponent,
        MovielistComponent,
        NewmovieComponent,
        ReviewlistComponent,
        AddreviewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
