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
Array.from(document.getElementsByClassName("question")).forEach(question => {
    let progressionButton = question.getElementsByClassName("progression")[0];
    if (question.classList.contains("multiple-choice")) {
        for (let radioButton of question.getElementsByClassName("radio-button"))
            radioButton.addEventListener("click", () => progressionButton.disabled = false);
    } else if (question.classList.contains("open-ended")) {
        let input = question.getElementsByTagName("input")[0];
        input.addEventListener("input", event => {
            if (event.target.value != "")
                progressionButton.disabled = false;
            else
                progressionButton.disabled = true;
        });
        input.addEventListener("keyup", event => {
            if (event.key == "Enter")
                progressionButton.dispatchEvent(new Event("click"));
        });
    }

    let hintButton = question.getElementsByClassName("hint-button")[0];
    let hintText = question.getElementsByClassName("hint")[0];
    if (hintButton) {
        hintButton.addEventListener("click", () => {
            hintText.style.display = "flex";
            hintButton.style.display = "none";
        });
    }

    progressionButton.addEventListener("click", () => {
        let answer = question.getElementsByClassName("answer")[0].innerHTML;
        let response = question.getElementsByClassName("response")[0];

        if (question.classList.contains("multiple-choice")) {
            let isCorrect = false;
            for (let radioButton of question.getElementsByClassName("radio-button")) {
                let input = radioButton.firstChild;
                if (input.id == answer) {
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
        } else if (question.classList.contains("open-ended")) {
            let input = question.getElementsByTagName("input")[0];
            if (input.value == answer)
                response.innerHTML = "Correct!";
            else {
                response.innerHTML = "Incorrect!";
                input.value = answer;
            }
        }

        for (let input of question.getElementsByTagName("input"))
            input.disabled = true;
        question.getElementsByClassName("explanation")[0].style.display = "flex";
        if (hintButton) {
            hintButton.style.display = "none";
            hintText.style.display = "none";
        }
    });
});