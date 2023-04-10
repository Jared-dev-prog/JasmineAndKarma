import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment.prod';

const listCartBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 10,
    amount: 3,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 7,
    amount: 5,
  },
];

fdescribe('ServiceBook', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks return a list of books and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listCartBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listCartBook);
  });
});
