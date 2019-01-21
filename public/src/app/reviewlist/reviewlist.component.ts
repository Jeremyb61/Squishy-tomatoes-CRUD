import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-reviewlist',
    templateUrl: './reviewlist.component.html',
    styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit {
    showReviews: any;
    movieId: any;
    constructor(private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router) {


    }

    ngOnInit() {
        this.showReviews = null;

        this._route.params.subscribe((params: Params) => {
            console.log(params['id']);
            this.movieId = params['id']
            let observable = this._httpService.reviews(this.movieId);
            observable.subscribe((data) => {
                console.log(data);
                this.showReviews = data;
                console.log("showReviews = ", this.showReviews)

                // set the item to our components variable e.g. this.editproduct = productfromserver
            });
        });
    }

    delete() {
        let observable = this._httpService.delete(this.movieId);
        observable.subscribe((data) => {
            this._router.navigate(['/movielist'])
        })
    }
}
