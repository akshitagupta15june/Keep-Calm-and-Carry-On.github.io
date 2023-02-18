const quoteText = document.querySelector('.quote'),
authorName = document.querySelector('.author .name'),
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector('.sound'),
copyBtn = document.querySelector('.copy'),
twitterBtn = document.querySelector('.twitter');


//random Quote function
async function randomQuote(){

  let url = "https://api.api-ninjas.com/v1/quotes?category=inspirational"
  let apiKey = "dixIPrZDngYXwKjvCVbkPQ==vlsaPRX04v5G2p8i";
  let response = await fetch(url, {
    method: "GET",
    headers: {
      'X-Api-Key': apiKey
    }
  });

 
  if(response.status == 200) {
      response = await response.json();
      console.log({updatedResponse: response});
    } else {
        alert("Something Went Wrong, Please refresh!");
    }

    console.log(response[0].quote);
    quoteText.innerHTML = response[0].quote;
    authorName.innerHTML = response[0].author;
    quoteBtn.innerText = result.content;
    quoteBtn.classList.remove("loading");
}

soundBtn.addEventListener("click", () =>{
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
    speechSynthesis.speak(utterance);
})

copyBtn.addEventListener("click", () =>{
    let text = quoteText.innerText;
    navigator.clipboard.writeText(text);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});


quoteBtn.addEventListener("click",randomQuote);