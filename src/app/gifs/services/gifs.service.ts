import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from 'src/app/shared/interfaces/gifs.interfaces';

const GIPHY_API_KEY: string = "R3w39NFulJsH6aT2ghWozjq7VYGd8x1B";

@Injectable({ providedIn: 'root' })
export class GifsService {

    public gifList: readonly Gif[] = [];

    private _tagsHistory: string[] = [];
    private serviceUrl: string = "https://api.giphy.com/v1/gifs/search"


    get tagsHistory(): readonly string[] {
        return this._tagsHistory
    }

    organizeHistory(tag: string) {
        tag = tag.toLowerCase();

        let index = this._tagsHistory.findIndex(v => v === tag);
        if (index >= 0) {
            this._tagsHistory.splice(index, 1)
        }
        this._tagsHistory.unshift(tag)
        this._tagsHistory.splice(10)
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem("history", JSON.stringify(this._tagsHistory))
    }
    private loadLocalStorage(): void {
        let data = localStorage.getItem("history");
        if (!data)
            return;
        this._tagsHistory = JSON.parse(data);
        let last = this._tagsHistory.at(0);
        if (last === undefined)
            return;
        this.searchTag(last);
    }


    searchTag(tag: string): void {

        if (tag.length === 0)
            return;

        this.organizeHistory(tag)

        const params = new HttpParams()
            .set('api_key', GIPHY_API_KEY)
            .set('limit', "10")
            .set('q', tag);

        this.http.get<SearchResponse>(this.serviceUrl, { params })
            .subscribe(resp => {

                this.gifList = resp.data;
            })

        // this._tagsHistory.unshift(tag)
    }

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
    }

}
