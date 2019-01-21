import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-movielist',
    templateUrl: './movielist.component.html',
    styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
    showMovie: any;
    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.getMovies()
    }
    getMovies() {
        let observable = this._httpService.allMovies();
        observable.subscribe((data) => {
            console.log("Show products method", data);
            this.showMovie = data;
        });
    }
}
