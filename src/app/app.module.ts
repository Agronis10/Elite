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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import{MatInputModule , MatSelectModule , MatOptionModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageFormatterComponent } from './image-formatter/image-formatter.component';
import { SafeHtmlPipe } from './safe-html.pipe';


const appRoutes: Routes = [
  {path:'About', component:AboutmeComponent},
  {path:'Description',component:DescriptionPageComponent},
  {path:'PoList',component:POListComponent},
  {path:'Login',component:LoginComponent},
  {path:'Po/:id',component:EditPOComponent},
  {path:'Po/:id/:type',component:EditPOComponent},
  { path: '',   redirectTo: '/PoList', pathMatch: 'full' }
  ]
@NgModule({
  declarations: [
    AppComponent,
    AboutmeComponent,
    DescriptionPageComponent,
    NavbarComponent,
    LoginComponent,
    POListComponent,
    EditPOComponent,
    ImageFormatterComponent,
    SafeHtmlPipe
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([ImageFormatterComponent]),
    MatDatepickerModule,
    MatNativeDateModule ,
    MatFormFieldModule ,
    MatSelectModule,
    MatOptionModule,
    MatInputModule ,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
