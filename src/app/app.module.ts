import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { DescriptionPageComponent } from './description-page/description-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { POListComponent } from './Queries/polist/polist.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { EditPOComponent } from './edit-po/edit-po.component';
import {Blob2ImageService} from  './/blob2-image.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, Reacconst appRoutes: Routes = [
  {path:'About', component:AboutmeComponent},
  {path:'Description',component:DescriptionPageComponent},
    
  ]
@NgModule({
  declarations: [
    AppComponent,
    AboutmeComponent,
    DescriptionPageComponent,
    NavbarComponent,
    LoginComponent,
    POListComponent,
    EditPOComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule
  ],
  providers: [    BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
