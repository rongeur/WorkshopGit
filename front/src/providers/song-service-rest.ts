import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {SERVER_URL} from './config';
import 'rxjs/Rx';

let songsURL = SERVER_URL + 'songs/';

@Injectable()
export class SongService {
  favorites: Array<any> = [];

    constructor(public http: Http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(songsURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(songsURL + id)
            .map(res => res.json())
            .toPromise();
    }

    getFavorites() {
        return Promise.resolve(this.favorites);
    }

    canFavorite(song) {
        console.log(song);
        console.log(this.favorites);
        return this.favorites.map(s => s._id).indexOf(song._id) === -1;
    }

    favorite(song) {
        this.favorites.push(song);
        return Promise.resolve();
    }

    unfavorite(song) {
        let index = this.favorites.map(s => s._id).indexOf(song._id);
        if (index > -1) {
          this.favorites.splice(index, 1);
        }
        return Promise.resolve();
    }
}