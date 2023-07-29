import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ImageLoaderComponent } from './Components/image-loader/image-loader.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ImageLoaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SidebarComponent,
    ImageLoaderComponent
  ],
})
export class SharedModule { }
