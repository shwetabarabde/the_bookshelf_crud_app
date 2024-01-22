import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book.model';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  
    transform(booksList: any, searchText: any): any {
      let updatedBooksList: any;
  
      if (searchText)
      updatedBooksList = booksList.filter((book: Book) =>
        book.title.toLowerCase()
    .startsWith(searchText.toLowerCase()));
    else
    updatedBooksList = booksList;
  
      return updatedBooksList;
  }

}
