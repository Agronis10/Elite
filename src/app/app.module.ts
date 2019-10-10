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
// import {Blob2ImageService} from  './/blob2-image.service'


const appRoutes: Routes = [
  {path:'About', component:AboutmeComponent},
  {path:'Description',component:DescriptionPageComponent},
  {path:'PoList',component:POListComponent},
  {path:'Po/:id',component:EditPOComponent},
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
    AgGridModule.withComponents([])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
