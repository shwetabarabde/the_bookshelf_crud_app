import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  editForm!: FormGroup;
  submitted: boolean = false;
  bookId!: number;
  book!: Book[];
  update_book!: Book;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.bookId = params['id']
    }
    )
  };

  ngOnInit() {
    console.log(this.bookId)
    if (this.bookId != null) {
      if (!this.bookId) {
        alert('Invalid Action');
        this.router.navigate(['list-book']);
        return;
      }
      this.editForm = this.formBuilder.group({
        id: [this.bookId],
        title: ['', [Validators.required]],
        available: ['', [Validators.required]],
        price: ['', [Validators.required]],
        author: ['', [Validators.required]]
      });

      // this.courseService.getCoursesById(+courseId)
      this.bookService.getBookById(this.bookId).subscribe(data => {
        console.log(data);
        let temp = new Book();
        temp.id = data.id;
        temp.title = data.title;
        temp.available = data.available;
        temp.price = data.price;
        temp.author = data.author;
        this.update_book = temp;
        this.editForm.setValue(this.update_book);
        console.log(data);
      });
    }
    else {
      this.router.navigate(['/home']);
    }

  }

    // logOff 
    logOutBook(): void {
      this.router.navigate(['login']);
    }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    console.log(this.editForm.value)
    this.onEditBook(this.update_book);
  }

  onEditBook(book: Book): void {
    this.bookService.updateBook(this.editForm.getRawValue()).subscribe({
      next: (data) => {
      Swal.fire(
        'Good job!',
        'Book Updated Successfully!',
        'success'
      )
      this.router.navigate(['list-book']);
    }, error: (e) => console.error(e)
   });
  }


}
