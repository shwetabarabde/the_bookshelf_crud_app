import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ViewBookComponent } from './components/view-book/view-book.component';

export const routes: Routes = [
  	{ path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'view-book', component: ViewBookComponent },
    { path: 'login', component: LoginComponent },
  	{ path: 'list-book', component: ListBookComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'edit-book/:id', component: EditBookComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: HomeComponent }
  ];
