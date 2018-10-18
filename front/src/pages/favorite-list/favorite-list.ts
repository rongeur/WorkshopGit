import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SongService} from '../../providers/song-service-rest';
import {SERVER_URL} from '../../providers/config';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;
    serverUrl: string = SERVER_URL;

    constructor(public navCtrl: NavController, public service: SongService) {
        this.getFavorites();
    }

    deleteItem(song) {
        this.service.unfavorite(song)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
