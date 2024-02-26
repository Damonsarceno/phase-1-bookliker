document.addEventListener("DOMContentLoaded", function() {} );

document.addEventListener("DOMContentLoaded", listBooks);

function listBooks() {
  fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(books => books.forEach(book => renderBookTitle(book)));
}
function renderBookTitle(book) {
    const bookList  = document.getElementById("list");
    const titleItem = document.createElement("li");
    titleItem.textContent = book.title;
    bookList.appendChild(titleItem);

    titleItem.addEventListener("click",() => showBookDetail(book));
}
function showBookDetail(book) {
    const showPanel = document.getElementById("show-panel");
    const title = document.createElement("h1");
    const subtitle = document.createElement("h2");
    const description = document.createElement("p");
    const author = document.createElement("h2");
    const thumbnail = document.createElement("img");
    const users = document.createElement("ul");
    const likeButton = document.createElement("button");

    title.textContent = book.title;
    subtitle.textContent = book.subtitle;
    description.textContent = book.description;
    author.textContent = book.author;
    thumbnail.src = book.img_url;
    likeButton.textContent = "Like";

    book.users.forEach(user => {
        const userListItem = document.createElement("li");
        userListItem.textContent = user.username;
        users.append(userListItem);

})
    while(showPanel.firstChild) {
        showPanel.removeChild(showPanel.lastChild)
    }

    likeButton.addEventListener("click", () => submitLike(book));

    showPanel.append(thumbnail, title, subtitle, author, description, users, likeButton);


}
function submitLike(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type':'applicaton/json'
        },
        body: JSON.stringify({
            "users": [...book.users, {"id": 1, "username": "pouros"}]
        })
    })
    .then(res => res.json())
    .then(book => showBookDetail(book))

}
