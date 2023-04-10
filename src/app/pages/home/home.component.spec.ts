import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [BookService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks get books from the subscription', () => {
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
    ];

    const service = fixture.debugElement.injector.get(BookService);
    let spy1 = spyOn(service, 'getBooks').and.returnValue(of(listCartBook));

    component.getBooks();

    expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length).toBe(2);
  });
});
