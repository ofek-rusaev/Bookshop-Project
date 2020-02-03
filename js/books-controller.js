'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();

    var strHTMLs = books.map(function (book) {
        // var className = (book.isDone)? 'done' : '';
        return `<tr>
                    <td>${book.id}</td>
                    <td>${book.imgUrl}</td>
                    <td>${book.title}</td>
                    <td>$${book.price}</td>
                    <td> <button class="remove" title="Remove Book" onClick="onRemoveBook(event, ${book.id})">✖️</button> </td>
                    <td> <button class="edit" title="Edit Book" onClick="onEditBook(event, ${book.id})">✏️</button> </td>
                    <td> <button class="info" title="Book Details" onClick="onShowDetailsBook(event, ${book.id})">🔍</button> </td>
                </tr>`
    })
    var elBookList = document.querySelector('tbody');
    elBookList.innerHTML = strHTMLs.join('');
}

function onSortChange(elSort) {
    var sortBy = elSort.dataset.sort;
    setSort(sortBy);
    renderBooks();
}

function onRateBook() {
    var elRateBtn = document.querySelector('.rate-save');
    var bookId = +elRateBtn.dataset.id;
    var book = getBook(bookId);
    var elRate = document.querySelector('.txt-rate');
    book.rate = +elRate.value;
    var elRateMsg = document.querySelector('.after-rating');
    elRateMsg.hidden = false;
}

// TODO - remove event parameter
function onShowDetailsBook(event, bookId) {
    var elRateMsg = document.querySelector('.after-rating');
    elRateMsg.hidden = true;
    var book = getBook(bookId);
    var elModal = document.querySelector('.modal');
    elModal.hidden = false;
    elModal.querySelector('h3').innerText = book.title;
    elModal.querySelector('h4').innerText = `$${book.price}`;
    elModal.querySelector('h5').innerHTML = book.imgUrl;
    elModal.querySelector('p').innerHTML = book.desc;
    var elRateInput = document.querySelector('.txt-rate');
    elRateInput.value = book.rate;
    var elRateBtn = document.querySelector('.rate-save');
    elRateBtn.dataset.id = bookId;
}

function onEditBook(event, bookId) {
    onAddBook();
    var book = getBook(bookId);
    var elTxtTitle = document.querySelector('.txt-title');
    elTxtTitle.value = book.title;
    var elTxtPrice = document.querySelector('.txt-price');
    elTxtPrice.value = book.price;
    elTxtTitle.dataset.id = bookId;
}

function onRemoveBook(event, bookId) {
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onAddBook() {
    var elAddBook = document.querySelector('.book-edit');
    elAddBook.hidden = false;
}

function onSaveBook() {
    console.log('saving book...');
    var elTxtTitle = document.querySelector('.txt-title');
    var elTxtPrice = document.querySelector('.txt-price');
    var title = elTxtTitle.value;
    var price = elTxtPrice.value;
    if (!title || !price) return;

    var bookId = +elTxtTitle.dataset.id;
    var bookData = {
        title: title,
        price: price,
        imgUrl: 'Coming soon...'
    }
    if (bookId) {
        var book = getBook(bookId);
        book.title = title;
        book.price = price;
        updateBook(book);
    } else {
        addBook(bookData)
    }
    elTxtTitle.value = '';
    elTxtTitle.dataset.id = '';
    elTxtPrice.value = '';
    var elAddBook = document.querySelector('.book-edit');
    elAddBook.hidden = true;
    renderBooks();
}

function onCloseModal() {
    var elModal = document.querySelector('.modal');
    elModal.hidden = true;
}

function onChangePage(diff) {
    changePage(diff);
    var elPage = document.querySelector('span');
    elPage.innerText = getCurrPage();
    renderBooks();
}