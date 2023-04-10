import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';

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

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
    spyOn(service, 'getBooksFromCart').and.callFake(() => null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice returns an amount', () => {
    let totalPrice = component.getTotalPrice(listCartBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNull();
  });

  it('onInputNumberChange increments correctly', () => {
    const action: string = 'plus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 10,
      amount: 3,
    };

    let spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    let spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    component.onInputNumberChange(action, book);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(book.amount).toBe(4);
  });

  it('onInputNumberChange decrements correctly', () => {
    const action: string = 'minus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 10,
      amount: 3,
    };

    let spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    let spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    component.onInputNumberChange(action, book);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(book.amount).toBe(2);
  });

  it('onClearBook works fine', () => {
    component.listCartBook = listCartBook;

    let spy1 = spyOn(component as any, '_clearListCartBook').and.callThrough();
    let spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);

    component.onClearBooks();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(component.listCartBook.length).toBe(0);
  });

  it('onClearBook works bad', () => {
    component.listCartBook = [];
    let spy1 = spyOn(console, 'log');

    component.onClearBooks();

    expect(spy1).toHaveBeenCalledWith('No books available');
  });
});
