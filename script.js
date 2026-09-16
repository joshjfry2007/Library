const myLib =[];

function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.id = crypto.randomUUID();
    this.info = function(){
        console.log(`${this.title} by ${this.author} of ${pages} ; ${haveRead}`);
    }
    Book.prototype.toggleRead = function () {
        this.haveRead = !this.haveRead;
        display();
    };
}

function addBookToLibrary(title, author, pages, haveRead){
    const book = new Book(title, author, pages, haveRead);
    myLib.push(book);
}

function display(){
    const cards = document.querySelector("#cards");
    cards.innerHTML="";
    myLib.forEach((book)  =>{
        const card = document.createElement("div");
        card.classList.add("book-card")
        let r = Math.floor(Math.random() * 86);
        let g = Math.floor(Math.random() * 86);
        let b = Math.floor(Math.random() * 86);
        card.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        // card.style.borderRadius = "10px"
        // card.style.padding = "10px 10px 10px 10px"

        card.setAttribute("data-id", book.id);
        card.innerHTML = 
            `<h4>Name : ${book.title}</h4>
            <p>Author : ${book.author}</p>
            <p>Number of pages : ${book.pages}</p>
            <p>${book.haveRead ? "Read" : "Not Read"}</p>
            <button class="toggle-read-btn">Toggle Read</button>`
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.style.padding = "5px 10px"
        // delBtn.style.marginBottom = "10px"
        delBtn.addEventListener("click", () => {
            const index = myLib.findIndex((book) => book.id === card.dataset.id);
            myLib.splice(index,1);
            cards.removeChild(card);
            display();
        })
        const toggleBtn = card.querySelector(".toggle-read-btn");
        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            display();
        });
        card.appendChild(delBtn);
        cards.appendChild(card);
    })
}

const dialog = document.querySelector("#new-book-dialog");
const newBookButton = document.querySelector("#new-book");
const cancelButton = document.querySelector("#cancel-btn");
newBookButton.addEventListener("click",() =>{
    dialog.showModal();
})

cancelButton.addEventListener("click", () =>{
    dialog.close();
})

document.querySelector("#new-book-form").addEventListener("submit", (event)=>{
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);
    display();
    event.target.reset();
    dialog.close();
})