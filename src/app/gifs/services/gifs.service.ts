import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({providedIn: 'root'})
export class GifsService {
  constructor(private http:HttpClient) {
    this.loadLocalStorage();

  }

  public gifsList:Gif[] = [];

  private _tagsHistory:string[] = [];
  private apiKey:string = 'hhYcbxDnbxewglZZQuPdfQftGAJUpe5Q';
  private baseUrl:string = 'https://api.giphy.com/v1/gifs'

  get tagsHistory(){
    return [...this._tagsHistory]
  }


  private organizeHistoryForSeach(tag:string){
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag => oldTag !== tag));
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();

  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory) );
  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);

  }

  public searchTag(tag:string):void{
    if (tag.length === 0 ) return;
    this.organizeHistoryForSeach(tag);

    const params = new HttpParams()
    .set('q', tag)
    .set('api_key', this.apiKey)
    .set('limit', 10)


    this.http.get<SearchResponse>(`${this.baseUrl}/search`, {params})
    .subscribe(resp=>{
      this.gifsList = resp.data;
    })

  }


}
