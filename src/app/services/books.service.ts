import { Injectable } from '@angular/core';
import { Book } from '../model/books.model';
import { BookType } from '../model/bookType.model';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat, apiURLty } from '../config';
import { BookTypeWrapper } from '../model/BookTypeWrapped.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  apiURL: string = 'http://localhost:8082/books/api';
  apiURLCatt: string = 'http://localhost:8082/books/cat';

  books!: Book[];
  booksType!: BookType[];
  book!: Book;

  constructor(private http: HttpClient, private authService: AuthService) {}

  listBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL + '/all');
  }

  addBook(book: Book): Observable<Book> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt })
    return this.http.post<Book>(apiURL+"/addbook", book, {headers:httpHeaders});
  }

  deleteBook(bookId: number) {
    const url = `${apiURL}/delbook/${bookId}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt })
    return this.http.delete(url, {headers:httpHeaders});
  }

  consulterBook(id: number): Observable<Book> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt })
    return this.http.get<Book>(url, {headers:httpHeaders});
  }

  updateBook(boo: Book): Observable<Book> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt })
    return this.http.put<Book>(apiURL+"/updatebook", boo, {headers:httpHeaders});
  }

  /*trierBooks(ascending: boolean = true) {
    this.books = this.books.sort((a, b) => {
      if (a.id! > b.id!) {
        return ascending ? 1 : -1;
      } else if (a.id! < b.id!) {
        return ascending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }*/
  //types---------------------------------------------------------

  listeTypes(): Observable<BookTypeWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt })
    return this.http.get<BookTypeWrapper>(apiURLCat,{headers:httpHeaders});
  }

  rechercherParBookType(id: number): Observable<any> {
    const url = `${apiURLty}/${id}/books`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt })
    return this.http.get(url , {headers:httpHeaders}).pipe(
      tap((response) => {
        console.log('Response from rechercherParBookType:', response); // Check if this is an array or an object with _embedded
      })
    );
  }

  rechercherParNom(nom: string): Observable<Book[]> {
    const url = `${apiURL}/booksByTitle/${nom}`;
    return this.http.get<Book[]>(url);
  }

  ajouterType(boo: BookType): Observable<BookType> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt })
    return this.http.post<BookType>(this.apiURLCatt, boo, {headers:httpHeaders});
  }
}
