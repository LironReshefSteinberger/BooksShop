'use strict';
console.log('main');

var gPagesNumBtns = 3;


function onInit() {
    // debugger;
    var books = init();
    renderBooks(books);
    console.log('gBooks', gBooks);
}

// onSetFilter(this.value) from DOM
function onSetFilter(strFilter) {
    setFilter(strFilter);
    renderBooks();
}

function displayModal(bookId) {
    var strHTML = `        
                <div class="modal fade" id="modal-container" tabindex="-1" role="dialog" aria-labelledby="modal-containerLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title book-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h2 class="book-price"></h2>
                            <h2 class="book-picture"></h2>
                            <h2 class="book-rate"></h2>
                            <button type="button" class="btn btn-success btn-thumb-up" onclick="onRateUp('${bookId}')">👍</button>
                            <button type="button" class="btn btn-dangar btn-thumb-down" onclick="onRateDown('${bookId}')">👎</button>
                        </div>
                    </div>
                </div>
                </div>
                `;
    $('.modal-container').html(strHTML);
    console.log(strHTML);
}

function readBookDetailsAndRates(ev, bookId) {
    displayModal(bookId);
    updateModal(bookId);
    renderBooks();
}

function onRateUp(bookId) {
    $('.book-rate').html(rateUp(bookId));
    updateModal(bookId);
}

function onRateDown(bookId) {
    $('.book-rate').html(rateDown(bookId));
    updateModal(bookId);
}

function updateModal(bookId) {
    var book = findBookById(bookId);
    // displayRateUpDownBtns(bookId);
    // console.log('displayModal book', book);
    $('.book-title').html(book.title);
    $('.book-price').html(book.price + '$');
    $('.book-picture').html(book.picture);
    $('.book-rate').html(book.rate);
}

function readAndUpdateBook(ev, bookId) {
    var bookPrice;
    while (!bookPrice) {
        bookPrice = +prompt('Please enter the NEW book price');
    }
    updateBook(bookId, bookPrice);
    renderBooks();
}

function readAndAddNewBook() {
    //trim- return string without spaces
    var bookTitle = $('.input-book-title').val().trim();
    if (bookTitle === '') return;
    console.log('bookTitle', bookTitle);
    // var bookPrice = $('.input-book-price').parseInt(val());
    var bookPrice = +$('.input-book-price').val();
    if (!bookPrice) return;
    // they are all falsy
    // if (bookPrice === null || bookPrice === NaN || bookPrice === 0) return;
    addBook(bookTitle, bookPrice);
    // after adding deleting the values in the inputs
    $('.input-book-title').val('');
    $('.input-book-price').val('');
    renderBooks();
}

// when clicking
function onDeleteBook(ev, bookId) {
    console.log('onDeleteBook');
    if (!confirm('Are you sure?')) return;
    deleteBook(bookId);
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTML = `<tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th colspan="3">Actions</th>
                    </tr>`;
    books.forEach(function (book, idx) {
        var className = idx;
        strHTML += `
            <tr class="book book-${className}">
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button class="btn btn-read btn-primary" onclick="readBookDetailsAndRates(event, '${book.id}')" data-toggle="modal" data-target="#modal-container">
                     Read
                    </button>
                </td>
                <td>
                    <button class="btn btn-update btn-warning" onclick="readAndUpdateBook(event, '${book.id}')">
                     Update
                    </button>
                </td>
                <td>
                    <button class="btn btn-delete btn-danger" onclick="onDeleteBook(event, '${book.id}')">
                     Delete
                    </button>
                </td>
            </tr>`
    })

    // console.log(strHTML);
    $('.books-table').html(strHTML);
    renderPagesBtns();
}

function renderPagesBtns() {
    var strHTML = `<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div class="btn-group mr-2" role="group" aria-label="First group">
                        <button type="button" class="btn btn-page-back btn-secondary" onclick="moveBack()">&lt;&lt;</button>
                        </div>
                        <div class="btn-group mr-2 pages-numbers-btns" role="group" aria-label="Second group">
                        <button type="button" class="btn btn-page-1 btn-secondary" onclick="moveToPage1()">1</button>
                        <button type="button" class="btn btn-page-2 btn-secondary" onclick="moveToPage2()">2</button>
                        <button type="button" class="btn btn-page-3 btn-secondary" onclick="moveToPage3()">3</button>
                        </div>
                        <div class="btn-group" role="group" aria-label="Third group">
                        <button type="button" class="btn btn-page-forword btn-secondary" onclick="moveForword()">&gt;&gt;</button>
                        </div>
                    </div>`;
    $('.pages-btns').html(strHTML);
}

// display max books in page
// function booksPerPage() {
//     gBooks
// }

function moveToPage1(startIdx, itemsPerPage) {
    var books = gBooks.slice();
    var startIdx = 0;
    var itemsPerPage = 3;
    var booksInPage = books.splice(startIdx, itemsPerPage);
    console.log('booksInPage', booksInPage);
    renderBooks(booksInPage);
}

function moveToPage2(startIdx, itemsPerPage) {
    var books = gBooks.slice();
    var startIdx = 3;
    var itemsPerPage = 3;
    var booksInPage = books.splice(startIdx, itemsPerPage);
    console.log('booksInPage', booksInPage);
    renderBooks(booksInPage);
}

function moveToPage3(startIdx, itemsPerPage) {
    var books = gBooks.slice();
    var startIdx = 6;
    var itemsPerPage = 3;
    var booksInPage = books.splice(startIdx, itemsPerPage);
    console.log('booksInPage', booksInPage);
    renderBooks(booksInPage);
}

// function addClass() {
//     // var elsPagebtns = $('.pages-numbers-btns').addClass('.')

//     for (var i = 1; i <= gPagesNumBtns.length; i++) {
//         var className = i;

//     }

// function getBooksForDisplay(strFilter) {
//     gBooksFilter = strFilter;
// }
