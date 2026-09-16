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
        // card.style.backgroundColor = "rgb(195, 157, 231)"
        // card.style.borderRadius = "10px"
        // card.style.padding = "10px 10px 10px 10px"

        card.setAttribute("data-id", book.id);
        card.innerHTML = 
            `<p>${book.title}</p>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <p>${book.haveRead ? "Read" : "Not Read"}</p>`
        
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