function searchBook() {
    let searchBookTitle = document.getElementById('.searchBookTitle');
    let filter = searchBookTitle.value.toUpperCase();
    let book = document.getElementsByClassName("book_list");

    for (let i = 0; i < book.length; i++) {
        let bookTitle = book[i].getElementsByTagName("h3")[0];
        let textValue = bookTitle.textContent || bookTitle.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            book[i].style.display = "";
        } else {
            book[i].style.display = "none";
        }
    }
}