'use strict';

var gTrans = {
    title: {
        en: 'Welcome to your shop',
        he: 'ברוך הבא אל חנות הספרים שלך'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'add-book-title': {
        en: 'Book Title',
        he: 'כותרת הספר'
    },
    'add-book-price': {
        en: 'Book Price',
        he: 'מחיר הספר'
    },
    'table-book-id': {
        en: 'ID',
        he: 'מזהה'
    },
    'table-book-cover': {
        en: 'Book Cover',
        he: 'עטיפת הספר'
    },
    'table-book-title': {
        en: 'Title',
        he: 'שם'
    },
    'table-book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'table-book-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    rate: {
        en: 'Rate',
        he: 'דרג'
    },
    'rate-title': {
        en: 'Add rating 0-10',
        he: 'הוסף דירוג בין 0-10'
    },
    'rate-thankyou-msg': {
        en: 'Thank you for rating!',
        he: 'תודה על הדירוג!'
    },
    'modal-book-details': {
        en: 'Book Details',
        he: 'פרטי הספר'
    },
    'modal-book-title': {
        en: 'Title',
        he: 'כותרת'
    },
    'modal-book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'prev-page': {
        en: '⬅️',
        he: '➡️'
    },
    'next-page': {
        en: '➡️',
        he: '⬅️'
    },
    'title-txt-remove': {
        en: 'Remove Book',
        he: 'הסר ספר'
    },
    'title-txt-edit': {
        en: 'Edit Book',
        he: 'ערוך ספר'
    },
    'title-txt-show': {
        en: 'Book Details',
        he: 'ראה פרטי ספר'
    },
    'title-sort-by-name': {
        en: 'Sort by title',
        he: 'סדר לפי שם'
    },
    'title-sort-by-price': {
        en: 'Sort by price',
        he: 'סדר לפי מחיר'
    },
    'save-book': {
        en: 'Save',
        he: 'שמור'
    },
    'sign': {
        en: '$',
        he: '₪'
    }
}

var gCurrLang = 'en';

function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.title) {
            el.title = txt;
        } else if (el.placeholder) {
            el.placeholder = txt;
        } else if (el.dataset.trans === 'table-book-title') {
            renderTableHead(el, txt, getTrans('title-sort-by-name'));
        } else if (el.dataset.trans === 'table-book-price') {
            renderTableHead(el, txt, getTrans('title-sort-by-price'));
        }
        else el.innerText = txt;
    });
}


function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if (gCurrLang === 'en') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
    if (gCurrLang === 'he') {
        num *= 3.4513;
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    }
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}