var contentSections = document.getElementsByClassName("content-section");
Array.from(contentSections).forEach((contentSection, index) => {
    if (index == 0)
        contentSection.style.display = "flex";
    let nextContentSection = contentSections[index + 1];
    if (nextContentSection) {
        contentSection.getElementsByClassName("progression")[0].addEventListener("click", event => {
            if (!event.target.parentElement.parentElement.classList.contains("question"))
                nextContentSection.scrollIntoView(true);
            nextContentSection.style.display = "flex";
            event.target.style.display = "none";
        });
    }
});
var questions = document.getElementsByClassName("question");
Array.from(questions).forEach(question => {
    let progressionButton = question.getElementsByClassName("progression")[0];
    if (question.classList.contains("multiple-choice")) {
        for (let radioButton of question.getElementsByClassName("radio-button"))
            radioButton.addEventListener("click", () => progressionButton.disabled = false);
    }
    progressionButton.addEventListener("click", () => {
        if (question.classList.contains("multiple-choice")) {
            let isCorrect = false;
            let response = question.getElementsByClassName("response")[0];
            for (let radioButton of question.getElementsByClassName("radio-button")) {
                let input = radioButton.firstChild;
                if (input.id == question.getElementsByClassName("answer")[0].innerHTML) {
                    radioButton.style.backgroundColor = "#7a9f79";
                    if (input.checked == true) {
                        isCorrect = true;
                        response.innerHTML = "Correct!";
                    }
                }
                radioButton.setAttribute("disabled", true);
            }

            if (!isCorrect)
                response.innerHTML = "Incorrect!";
        }
        for (let input of question.getElementsByTagName("input"))
            input.disabled = true;
        question.getElementsByClassName("explanation")[0].style.display = "flex";
    });
});