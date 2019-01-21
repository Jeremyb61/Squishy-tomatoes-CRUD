import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-addreview',
    templateUrl: './addreview.component.html',
    styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
    addReviews: any;
    titleError: any;
    starError: any;
    commError: any;
    nameError: any;
    movie: any;


    constructor(private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router) { }
    ngOnInit() {
        this.addReviews = { ratings: { name: '', star: '', comments: '' } }
        this._route.params.subscribe((params: Params) => {
            console.log(params['id']);
            this.movie = params['id']

            let observable = this._httpService.reviews(this.movie);
            observable.subscribe((data) => {
                console.log(data);
                this.movie = data;
                console.log("movie object = ", this.movie)
            });
        });
    }
    addReview() {
        console.log(this.addReviews)
        let observable = this._httpService.update(this.movie, this.addReviews);
        observable.subscribe((data) => {
            console.log(data)
            if (data['status'] === false) {
                if (data['err']['errors']['name']) {
                    this.nameError = data['err']['errors']['name']['message'];
                }
                if (data['err']['errors']['star']) {
                    this.starError = data['err']['errors']['star']['message'];
                }
                if (data['err']['errors']['comments']) {
                    this.commError = data['err']['errors']['comments']['message'];
                }

            }
        })
    }
}
