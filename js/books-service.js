'use strict';

const KEY = 'books';
const BOOKS_ON_PAGE = 3;

var gSortBy;
var gCurrPage = 1;

var gBooks = _createBooks();

function getBooksForDisplay() {
    var booksToDisplay;
    if (gSortBy) {
        booksToDisplay = sortingBooks(gBooks);
    } else {
        booksToDisplay = gBooks;
    }
    var from = (gCurrPage - 1) * BOOKS_ON_PAGE;
    var to = from + BOOKS_ON_PAGE;
    return booksToDisplay.slice(from, to);
}

function sortingBooks(objs) {
    var sortedBook;
    if (gSortBy === 'title') {
        sortedBook = objs.sort(function (a, b) {
            var aTitle = a.title.toUpperCase();
            var bTitle = b.title.toUpperCase();
            return (aTitle > bTitle) ? 1 : -1;
        });
    }
    if (gSortBy === 'price') {
        sortedBook = objs.sort((a, b) => (a.price > b.price) ? 1 : -1);
    }
    return sortedBook;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function updateBook(book) {
    var idx = gBooks.findIndex(currBook => currBook.id === book.id);
    gBooks.splice(idx, book)
    saveToStorage(KEY, gBooks);
}

function addBook(bookData) {
    var book = _createBook(bookData);
    gBooks.unshift(book);
    saveToStorage(KEY, gBooks);
}

function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / BOOKS_ON_PAGE);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;
}

function getCurrPage() {
    return gCurrPage;
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;
    else {
        books = [
            { title: 'Less', author: 'Andrew Sean Greer', price: 29.99, imgUrl: `<img src="img/less.jpg" alt="">` },
            { title: 'The Alchemist', author: 'Paulo Coelho', price: 19.99, imgUrl: `<img src="img/the_alchemit.jpg" alt="">` },
            { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', price: 27.99, imgUrl: `<img src="img/one_hundred_years.jpg" alt="">` },
            { title: 'The Power of Now', author: 'Eckhart Tolle', price: 22.99, imgUrl: `<img src="img/power_o_now.jpg" alt="">` },
            { title: 'The Book of Mirrors', author: 'E. O. Chirovici', price: 17.99, imgUrl: `<img src="img/book_o_mirrors.jpg" alt="">` },
            { title: 'Conversations with God', author: 'Neale Donald Walsch', price: 24.99, imgUrl: `<img src="img/con_w_god.jpg" alt="">` }]
                .map(_createBook);

        // books = [
        //     _createBook('Less', 'Andrew Sean Greer', 29.99, `<img src="img/less.jpg" alt="">`),
        //     _createBook('The Alchemist', 'Paulo Coelho', 19.99, `<img src="img/the_alchemit.jpg" alt="">`),
        //     _createBook('One Hundred Years of Solitude', 'Gabriel García Márquez', 27.99, `<img src="img/one_hundred_years.jpg" alt="">`),
        //     _createBook('The Power of Now', 'Eckhart Tolle', 19.99, `<img src="img/power_o_now.jpg" alt="">`),
        //     _createBook('The Book of Mirrors', 'E. O. Chirovici', 17.99, `<img src="img/book_o_mirrors.jpg" alt="">`),
        //     _createBook('Conversations with God', 'Neale Donald Walsch', 24.99, `<img src="img/con_w_god.jpg" alt="">`)
        // ];
    }
    // var books = [{title: 'blah ', price: 232}, {title: 'blala2', price: 343}]
    //     .map(_createBook);

    return books;
}

function _createBook(bookData) {
    return {
        id: parseInt(Math.random() * 1000),
        title: bookData.title,
        author: bookData.author,
        price: bookData.price,
        rate: 0,
        imgUrl: bookData.imgUrl,
        desc: `${bookData.title} is Noval by ${bookData.author}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perferendis cupiditate odio ipsam veritatis obcaecati eveniet inventore, rem fugit, perspiciatis nemo! Sed, alias et amet explicabo iusto optio tempora similique.`
    }
}