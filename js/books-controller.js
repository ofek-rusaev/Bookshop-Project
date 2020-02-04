'use strict';

function onInit() {
    doTrans();
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();

    var strHTMLs = books.map(function (book) {
        return `<tr>
                    <td>${book.id}</td>
                    <td>${book.imgUrl}</td>
                    <td>${book.title}</td>
                    <td>${formatCurrency(book.price)}</td>
                    <td> <button class="remove" title="Remove Book" onClick="onRemoveBook(event, ${book.id})" data-trans="title-txt-remove">✖️</button> </td>
                    <td> <button class="edit" title="Edit Book" onClick="onEditBook(event, ${book.id})" data-trans="title-txt-edit">✏️</button> </td>
                    <td> <button class="info" title="Book Details" onClick="onShowDetailsBook(event, ${book.id})" data-trans="title-txt-show">🔍</button> </td>
                </tr>`
    })
    var elBookList = document.querySelector('tbody');
    elBookList.innerHTML = strHTMLs.join('');
    doTrans();
}

function onSortChange(elSort) {
    setSort(elSort);
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
    onRateAddingStars(book.rate);
}

function onShowDetailsBook(event, bookId) {
    var elRateMsg = document.querySelector('.after-rating');
    elRateMsg.hidden = true;
    var book = getBook(bookId);
    var elModal = document.querySelector('.my-modal');
    elModal.hidden = false;
    elModal.querySelector('h3').innerText = book.title;
    elModal.querySelector('h4').innerText = formatCurrency(book.price);
    elModal.querySelector('h5').innerHTML = book.imgUrl;
    elModal.querySelector('p').innerHTML = book.desc;
    var elRateInput = document.querySelector('.txt-rate');
    elRateInput.value = book.rate;
    onRateAddingStars(elRateInput.value);
    var elRateBtn = document.querySelector('.rate-save');
    elRateBtn.dataset.id = bookId;
}

function onRateAddingStars(count) {
    var elStarSpan = document.querySelector('.rate-area span');
    var starStr = '⭐'
    elStarSpan.innerText = starStr.repeat(count);
    if (count > 5) {
        var splitStarStr = starStr.repeat(5) + '<br/>' + starStr.repeat(count-5);
        elStarSpan.innerHTML = splitStarStr;
    }
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
    var elModal = document.querySelector('.my-modal');
    elModal.hidden = true;
}

function onChangePage(diff) {
    changePage(diff);
    var elPage = document.querySelector('span');
    elPage.innerText = getCurrPage();
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    doTrans();
    renderBooks();
}

function renderTableHead(el, txt, title) {
    if (el.dataset.trans === 'table-book-title') {
        el.innerHTML = `
        <th scope="row" class="title" data-trans="table-book-title">
        <button onclick="onSortChange('title')" title="${title}" data-trans="title-sort-by-name">⬇️</button>
        ${txt}
    </th>
        `
    } else {
        el.innerHTML = `
        <th class="price" data-trans="table-book-price">
        <button onclick="onSortChange('price')" title="${title}" data-trans="title-sort-by-price">⬇️</button>
        ${txt}
    </th>
        `
    }
}
