'use strict';
console.log('books-service');

var gBooks = [];
var BOOKS_KEY = 'booksApp';
//the first option of select - its empty in the html
var gBooksFilter = '';

var BOOK_COVER_GAME = '<img src="img/gameOfThrones.png">';
var BOOK_COVER_NARNIA = '<img src="img/chroniclesOfNarnia.png">';
var BOOK_COVER_WIND = '<img src="img/nameOfTheWind.png">';
var BOOK_COVER_DEFAULT = '<img src="img/defaultBookCover.png">';

function init() {
    gBooks = createBooks();
    saveToStorage(BOOKS_KEY, gBooks);
    return gBooks;
}

// function getBooks() {
//     return gBooks || init();
// }

function getBooksForDisplay() {
    var books = [];
    //after performing each function that change the gBooks - we need to load gBooks from localstorage
    books = loadFromStorage(BOOKS_KEY);

    // only when we do sort - dont take from localstorage
    if (gBooksFilter === 'title') books = sortByTitle();
    if (gBooksFilter === 'price') books = sortByPrice();
    return books;
}

function setFilter(strFilter) {
    gBooksFilter = strFilter;
}

// sort by price
function sortByPrice() {
    var books = gBooks.slice();
    books.sort(function (book1, book2) {
        return book1.price - book2.price;
    });
    console.log('sortByPrice:', books);
    return books;
}

// sort by title
function sortByTitle() {
    var books = gBooks.slice();
    books.sort(function (book1, book2) {
        var nameA = book1.title.toUpperCase(); // ignore upper and lowercase
        var nameB = book2.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    console.log('sortByTitle:', books);
    return books;
}
function updateRate(bookId, diff) {
    // debugger;
    var book = findBookById(bookId);
    // if (book.rate >= 10 || book.rate <= 0) return;
    console.log('book', book);
    book.rate += diff;
    console.log('book.rate', book.rate);
    return book;
}

function rateUp(bookId) {
    var book = updateRate(bookId, 1);
    if (book.rate > 10) book.rate = 10;
    saveToStorage(BOOKS_KEY, gBooks);
}

function rateDown(bookId) {
    var book = updateRate(bookId, -1);
    if (book.rate < 0) book.rate = 0;
}

function updateBook(bookId, bookPrice) {
    var idx = findIdxById(bookId);
    console.log('idx', idx);
    gBooks[idx].price = bookPrice;
    console.log('gBooks after updateBook', gBooks);
    saveToStorage(BOOKS_KEY, gBooks);
}

function addBook(bookTitle, bookPrice, bookCover) {
    var book = createBook(bookTitle, bookPrice);
    gBooks.push(book);
    console.log('gBooks after addBook', gBooks);
    saveToStorage(BOOKS_KEY, gBooks);
}

function deleteBook(bookId) {
    var idx = findIdxById(bookId);
    console.log('idx', idx);
    // checking it before splice - if splice get -1 it pop the last item
    if (idx === -1) return;
    //when found-delete
    console.log('gbook before splice', gBooks);
    gBooks.splice(idx, 1);
    console.log('gbook after splice', gBooks);
    saveToStorage(BOOKS_KEY, gBooks);
}

function createBooks() {
    var books = loadFromStorage(BOOKS_KEY);
    if (!books || books.length === 0) {
        books = [];
        books.push(createBook('A Game of Thrones', 20));
        books.push(createBook('The Name of the Wind', 35, 'img/nameOfTheWind.png'));
        books.push(createBook('The Chronicles of Narnia', 32));
        books.push(createBook('Piter Pen', 25));
        books.push(createBook('Shoko Popo', 13));
        books.push(createBook('Robots', 8));
        books.push(createBook('The animals', 99));
    }
    return books;
}

function createBook(bookTitle, bookPrice, bookCover) {
    var book = {
        id: makeId(),
        title: bookTitle,
        price: bookPrice,
        picture: bookCover || 'img/gameOfThrones.png',
        rate: 0
    };
    return book;
}

function findBookById(bookId) {
    var idx = findIdxById(bookId);
    return gBooks[idx];
}

function findIdxById(bookId) {
    var idx = -1;
    for (var i = 0; i < gBooks.length; i++) {
        var book = gBooks[i];
        if (book.id === bookId) {
            console.log('book.id', book.id);
            console.log('id', bookId);
            idx = i;
            break;
        }
    }
    return idx;
}