import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {SongService} from '../../providers/song-service-rest';
import {SERVER_URL} from '../../providers/config';


@Component({
    selector: 'page-song-list',
    templateUrl: 'song-list.html'
})
export class SongListPage {

    songs: Array<any>;
    songsForSearch: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;
    serverUrl = SERVER_URL;

    constructor(public navCtrl: NavController, public service: SongService, public config: Config) {
        this.findAll();
    }

    onInput(event) {
         // Reset items back to all of the items
        this.songs = this.songsForSearch;

        // set val to the value of the searchbar
        let val = this.searchKey;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.songs = this.songs.filter((song) => {
            return (song.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => {
                this.songs = data;
                this.songsForSearch = data;
            })
            .catch(error => alert(error));
    }
}
