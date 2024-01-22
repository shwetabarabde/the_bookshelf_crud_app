import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { FormBuilder } from '@angular/forms';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-book',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-book.component.html',
  styleUrl: './list-book.component.css'
})
export class ListBookComponent implements OnInit {

  books!: Book[];

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

  // Modify Book
  editBook(book: Book): void {

    this.router.navigate(['edit-book', book.id]);
  }

  // Delete Book
  deleteBook(book: Book): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.bookService.deleteBook(book.id).subscribe(data => {
          this.books = this.books.filter(u => u !== book);
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });

  }

}
