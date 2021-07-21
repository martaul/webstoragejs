const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;

    const Book = makeBook(BookTitle, BookAuthor, BookYear);
    const selesai = document.getElementById("inputChecked");

    if (selesai.checked == true) {
        const bookObject = composeBookObject(BookTitle, BookAuthor, BookYear, true);
        Book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        completedBOOKList.append(Book);
        updateDataToStorage();

    } else {
        const bookObject = composeBookObject(BookTitle, BookAuthor, BookYear, false);
        Book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        uncompletedBOOKList.append(Book);
        updateDataToStorage();

    }
}

makeBook = (title, author, year, isComplete) => {

    const BookTitle = document.createElement("h2");
    BookTitle.innerText = title;

    const BookAuthor = document.createElement("h3");
    BookAuthor.innerText = author;

    const BookYear = document.createElement("p");
    BookYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(BookTitle, BookAuthor, BookYear);

    const container = document.createElement("article");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    if (isComplete) {
        container.append(
            gkKelarButton(),
            hapusButton());

    } else {
        container.append(
            kelarButton(), 
            hapusButton());
}

return container;
}

function gkKelarButton() {
    return gkKelarBacaButton("blm-selesai-dibaca", function (event) {
        undoTasktoGkKelarButton(event.target.parentElement);
    });
}

function gkKelarBacaButton(buttonTypeClass, eventListener){
    const button = document.createElement('button');
    button.innerText='Belum Selesai di Baca';
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
    });

    return button;
}

function undoTasktoGkKelarButton(taskElement) {
    const listGkKelar = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const BooktaskTitle = taskElement.querySelector("h2").innerText;
    const BooktaskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const BooktaskYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(BooktaskTitle, BooktaskAuthor, BooktaskYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = false;
    newBook[BOOK_ITEMID] = book.id;

    listGkKelar.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function kelarButton() {
    return kelarBacaButton("selesai-dibaca", function (event) {
        addTaskToKelarCompleted(event.target.parentElement);
    });
}

function kelarBacaButton (buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.innerText = 'selesai dibaca';
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToKelarCompleted(taskElement) {
    const listKelar = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const BooktaskTitle = taskElement.querySelector("h2").innerText;
    const BooktaskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const BooktaskYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(BooktaskTitle, BooktaskAuthor, BooktaskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = true;
    newBook[BOOK_ITEMID] = book.id;

    listKelar.append(newBook);
    taskElement.remove();

    updateDataToStorage();

}

function hapusButton() {
    return deleteButton("hapus-button", function(event){
        confHapus(event.target.parentElement);
    });
}

function confHapus(taskElement){
    var conf = confirm("Apakah anda yakin untuk menghapus ?");
    
    if(conf == true) {
        const booksPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        books.splice(booksPosition, 1);
        taskElement.remove()
        updateDataToStorage();
    }
    return true;
}
  

function deleteButton(buttonTypeClass, eventListener){ 
    const button = document.createElement('button');
    button.innerText='Hapus Buku';
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
        
    });

    return button;
}
