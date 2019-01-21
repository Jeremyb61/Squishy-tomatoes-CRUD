import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-newmovie',
    templateUrl: './newmovie.component.html',
    styleUrls: ['./newmovie.component.css']
})
export class NewmovieComponent implements OnInit {
    newMovie: any;
    titleError: any;
    nameError: any;
    starError: any;
    commentsError: any;



    constructor(private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router) { }

    ngOnInit() {
        this.newMovie = { title: '', ratings: { star: "", comments: "", name: "" } }

    }

    addMovie() {
        console.log(this.newMovie)
        let observable = this._httpService.add(this.newMovie);
        observable.subscribe((data) => {
            if (data['status']) {
                this.newMovie = { title: '', ratings: { star: "", comments: "", name: "" } }
                console.log("Hit the add method", data);
                this._router.navigate(['/movielist'])
            } else {
                if (data['err']['errors']['title']) {
                    this.titleError = data['err']['errors']['title']['message'];
                }
                if (data['err']['errors']['ratings.0.name']) {
                    this.nameError = data['err']['errors']['ratings.0.name']['message'];
                }
                if (data['err']['errors']['ratings.0.star']) {
                    this.starError = data['err']['errors']['ratings.0.star']['message'];
                }
                if (data['err']['errors']['ratings.0.comments']) {
                    this.commentsError = data['err']['errors']['ratings.0.comments']['message'];
                }
            }
        });
    }

}
