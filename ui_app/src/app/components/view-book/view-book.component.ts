import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { FormBuilder } from '@angular/forms';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NamePipe } from '../../pipes/name.pipe';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent implements OnInit {

  books!: Book[];
  searchText: any;

  constructor(private router: Router,
    private bookService: BookService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getBooks()
      .subscribe({
        next: (data) => {
          this.books = data;
          console.log(data);
        },
        error: (e) => {
          Swal.fire(
            'Something went wrong!',
            'Please try again later',
            'error'
          )
          console.error(e);
          this.router.navigate(['home']);
        }
      });
  }

}
