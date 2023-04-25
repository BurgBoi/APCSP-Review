var contentSections = document.getElementsByClassName("content-section");
Array.from(contentSections).forEach((contentSection, index) => {
    if (index == 0)
        contentSection.style.visibility = "visible";
    let nextContentSection = contentSections[index + 1];
    if (nextContentSection) {
        contentSection.getElementsByClassName("progression-button")[0].addEventListener("click", event => {
            nextContentSection.style.visibility = "visible";
            event.target.style.visibility = "collapse";
        });
    }
});
var questions = document.getElementsByClassName("question");
Array.from(questions).forEach(question => {
    
});