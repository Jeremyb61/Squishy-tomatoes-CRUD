import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient) { }


    add(newMovie) {
        return this._http.post('/movie', newMovie)
    }
    allMovies() {
        return this._http.get('/movie')
    }
    reviews(id) {
        return this._http.get('/movie/' + id)
    }
    update(id, newReview) {
        return this._http.put("/movie/" + id, newReview)
    }
    delete(id) {
        return this._http.delete("/movie/" + id)
    }

}
