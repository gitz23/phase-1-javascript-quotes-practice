 //loads this page after loading
document.addEventListener('DOMContentLoaded', fetchQuotes);


//fetches the  quotes from the server
function fetchQuotes(){
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(data => {
        displayQuotes(data)
    })
};

//displays the quotes using the given order
function displayQuotes(quotes){
    const ulList = document.getElementById('quote-list')

    quotes.forEach(quote =>{
        let list = document.createElement('li')
        list.classList = 'quote-card'
        let blockQuote = document.createElement('blockquote')
        blockQuote.classList = 'blockquote'
        let paragraph = document.createElement('p')
        paragraph.classList = 'mb-0'
        paragraph.innerText = quote.quote
        let footer = document.createElement('footer')
        footer.classList = "blockquote-footer"
        footer.innerText = quote.author

        //adding buttons
        let likeButton = document.createElement('button')
        likeButton.className = ('btn-success')
        let span = document.createElement('span')
        span.innerHTML = "<p>0<p>"
        likeButton.innerText = 'Likes:';

        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'


        ulList.appendChild(list)
        list.appendChild(blockQuote)
        blockQuote.appendChild(paragraph)
        blockQuote.appendChild(footer)
        blockQuote.appendChild(likeButton)
        blockQuote.appendChild(deleteButton)
    })
};


//post function
let submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', postQuote)


function postQuote(e){
    e.preventDefault();
    let quoteInput = document.getElementById('new-quote');
    let authorInput = document.getElementById('author');


    let formData = {
        quote: quoteInput.value,
        author: authorInput.value,
    }

    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
    })
}






