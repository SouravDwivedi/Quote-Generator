const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author .name"),
    quoteBtn = document.querySelector("button"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy");

// random quote function
function randomQuote() {
    // quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        // quoteBtn.classList.remove("loading");
    });

}
soundBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance);
});
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});


quoteBtn.addEventListener("click", randomQuote);

// shortcut keys that will be disabled
const disabledkeys = ["c", "C", "x", "J", "u", "I"];
const showAlert = e => {
    e.preventDefault(); // prevent default behavior
    return alert("This feature is restricted!");
}
// call showAlert on mouse right-click
document.addEventListener("contextmenu", showAlert);
document.addEventListener("keydown", e => {
    // call showAlert, if the pressed key is F12 or matched to disabled keys
    if ((e.ctrlkey && disabledkeys.includes(e.key)) || e.key === "F12") {
        showAlert(e);
    }
});