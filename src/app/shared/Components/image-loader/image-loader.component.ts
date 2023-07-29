import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit{

  @Input()
  public url!:string;

  @Input()
  public alt:string ='';

  public hasLoader: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('Method not implemented.');
  }

  onLoad(){

    setTimeout(() => {
      this.hasLoader = true;
    }, 1000);
  }

}
