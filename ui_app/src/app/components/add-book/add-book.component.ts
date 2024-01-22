import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addForm!: FormGroup;
  book!: Book[];
  submitted: boolean = false;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private bookService: BookService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      bookTitle: ['', [Validators.required]],
      bookPrice: ['', [Validators.required]],
      bookAuthor: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    console.log(this.addForm.value)
    let temp = new Book();
    temp.title = this.addForm.get('bookTitle')?.value;
    temp.price = this.addForm.get('bookPrice')?.value;
    temp.author = this.addForm.get('bookAuthor')?.value;
    console.log('TEMP IS: ')
    console.log(temp);
    this.onAddBook(temp);

  }

  onAddBook(book: Book): void {
    Swal.fire(
      'Good job!',
      'Book Added Successfully!',
      'success'
    ).then((result) => {
      if (result.value) {
        this.bookService.addBook(book).subscribe(data => {
          this.router.navigate(['list-book']);
        });
      }
     });
  }

  onAddBook1(book: Book): void {
    this.bookService.addBook(book).subscribe({
      next: (data) => {
        Swal.fire(
          '',
          'Book Added Successfully!',
          'success'
        )
        this.router.navigate(['list-book']);
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
    })
  }
}


