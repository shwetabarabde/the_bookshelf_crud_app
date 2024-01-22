import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, User } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

baseUrl: string = "http://127.0.0.1:5000/request";

login(user: User) {
  if (user.email === 'admin@bookshelf.com' && user.password === 'admin') {
    return 'admin'
  } 
  else {
  return 'non-admin'
  }
}

getBooks() {
  return this.http.get<Book[]>(this.baseUrl);
}

getBookById(id: number) {
  return this.http.get<Book>(this.baseUrl + "/" + id);
}

addBook(book: Book) {
  console.log(book);
  return this.http.post(this.baseUrl, book);
}

// Modify
updateBook(book: Book) {
  return this.http.put(this.baseUrl, book);
}

// Delete by Id
deleteBook(id: number) {
  return this.http.delete(this.baseUrl + '/' + id);
}
}
