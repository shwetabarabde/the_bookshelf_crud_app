import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { BookService } from '../../services/book.service';
import { User } from '../../models/book.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder,
  private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    let user = { email: email, password: password }
    this.checkLogin(user);
  } // end of onSubmit() function

  checkLogin(user: User) {
    if (this.bookService.login(user) === 'admin') {
        Swal.fire(
       '',
       'Logged In Successfully!',
       'success'
        )
        this.router.navigate(['/list-book']);
    }
    else {
      alert("You are not an admin!")
      return
    }
  }
  } // end of LoginComponent class
  


