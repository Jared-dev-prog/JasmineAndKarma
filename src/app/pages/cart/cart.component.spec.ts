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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice returns an amount', () => {
    let totalPrice = component.getTotalPrice(listCartBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNull();
  });
});
