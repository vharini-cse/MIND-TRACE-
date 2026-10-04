javascript
/* =========================================================
   MINDTRACE
   Interactive Reflection Application
   ========================================================= */


/* =========================================================
   1. GLOBAL STATE
   ========================================================= */

const reflectionData = {
    situation: "",
    thought: "",
    emotion: "",
    intensity: 5,
    behavior: "",
    reaction: "",
    pattern: "",
    alternativeThought: "",
    reframe: ""
};

let currentStep = 1;


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

const reflectionForm = document.getElementById("reflectionForm");

const reflectionSteps =
    document.querySelectorAll(".reflection-step");

const progressSteps =
    document.querySelectorAll(".progress-step");

const nextButtons =
    document.querySelectorAll(".next-button");

const backButtons =
    document.querySelectorAll(".back-button");

const emotionOptions =
    document.querySelectorAll(".emotion-option");

const behaviorOptions =
    document.querySelectorAll(".behavior-option");

const patternOptions =
    document.querySelectorAll(".pattern-option");

const intensitySlider =
    document.getElementById("intensity");

const intensityValue =
    document.getElementById("intensityValue");

const summarySection =
    document.getElementById("summarySection");

const newReflectionButton =
    document.getElementById("newReflection");


/* =========================================================
   3. SHOW STEP
   ========================================================= */

function showStep(stepNumber) {

    currentStep = stepNumber;

    /*
       Hide every reflection step
    */

    reflectionSteps.forEach((step) => {

        step.classList.remove("active");

    });


    /*
       Show selected step
    */

    const selectedStep =
        document.querySelector(
            `.reflection-step[data-step="${stepNumber}"]`
        );

    if (selectedStep) {

        selectedStep.classList.add("active");

    }


    /*
       Update sidebar progress
    */

    progressSteps.forEach((step, index) => {

        const stepNumberFromSidebar = index + 1;

        step.classList.remove("active");

        if (stepNumberFromSidebar === stepNumber) {

            step.classList.add("active");

        }

        /*
           Mark previous steps as completed visually
        */

        if (stepNumberFromSidebar < stepNumber) {

            step.classList.add("completed");

        }

    });


    /*
       Scroll to reflection card
    */

    const reflectionCard =
        document.querySelector(".reflection-card");

    if (reflectionCard) {

        const top =
            reflectionCard.getBoundingClientRect().top
            + window.scrollY
            - 100;

        window.scrollTo({
            top: top,
            behavior: "smooth"
        });

    }

}


/* =========================================================
   4. SAVE CURRENT STEP DATA
   ========================================================= */

function saveCurrentStep() {

    /*
       STEP 1
    */

    const situation =
        document.getElementById("situation");

    if (situation) {

        reflectionData.situation =
            situation.value.trim();

    }


    /*
       STEP 2
    */

    const thought =
        document.getElementById("thought");

    if (thought) {

        reflectionData.thought =
            thought.value.trim();

    }


    /*
       STEP 3
    */

    reflectionData.intensity =
        intensitySlider
            ? Number(intensitySlider.value)
            : 5;


    /*
       STEP 4
    */

    const reaction =
        document.getElementById("reaction");

    if (reaction) {

        reflectionData.reaction =
            reaction.value.trim();

    }


    /*
       STEP 6
    */

    const alternativeThought =
        document.getElementById("alternativeThought");

    const reframe =
        document.getElementById("reframe");

    if (alternativeThought) {

        reflectionData.alternativeThought =
            alternativeThought.value.trim();

    }

    if (reframe) {

        reflectionData.reframe =
            reframe.value.trim();

    }

}


/* =========================================================
   5. VALIDATE STEP
   ========================================================= */

function validateStep(stepNumber) {

    /*
       STEP 1 — Situation
    */

    if (stepNumber === 1) {

        const situation =
            document.getElementById("situation");

        if (!situation.value.trim()) {

            showMessage(
                "Take a moment to describe what happened."
            );

            situation.focus();

            return false;

        }

    }


    /*
       STEP 2 — Automatic Thought
    */

    if (stepNumber === 2) {

        const thought =
            document.getElementById("thought");

        if (!thought.value.trim()) {

            showMessage(
                "Write down the first thought that came to mind."
            );

            thought.focus();

            return false;

        }

    }


    /*
       STEP 3 — Emotion
    */

    if (stepNumber === 3) {

        if (!reflectionData.emotion) {

            showMessage(
                "Choose the emotion that feels closest to your experience."
            );

            return false;

        }

    }


    /*
       STEP 4 — Behavior
    */

    if (stepNumber === 4) {

        if (!reflectionData.behavior) {

            showMessage(
                "Choose how you responded to the situation."
            );

            return false;

        }

    }


    /*
       STEP 5 — Thinking Pattern
    */

    if (stepNumber === 5) {

        if (!reflectionData.pattern) {

            showMessage(
                "Choose a thinking pattern to explore."
            );

            return false;

        }

    }


    return true;

}


/* =========================================================
   6. TEMPORARY MESSAGE
   ========================================================= */

function showMessage(message) {

    /*
       Remove existing message
    */

    const existingMessage =
        document.querySelector(".mindtrace-message");

    if (existingMessage) {

        existingMessage.remove();

    }


    /*
       Create message
    */

    const messageBox =
        document.createElement("div");

    messageBox.className =
        "mindtrace-message";

    messageBox.textContent =
        message;


    /*
       Styling through JavaScript
       so no additional CSS is required
    */

    messageBox.style.position = "fixed";
    messageBox.style.left = "50%";
    messageBox.style.bottom = "28px";
    messageBox.style.transform =
        "translateX(-50%)";

    messageBox.style.zIndex = "99999";

    messageBox.style.padding =
        "13px 20px";

    messageBox.style.background =
        "#4b315f";

    messageBox.style.color =
        "#ffffff";

    messageBox.style.borderRadius =
        "100px";

    messageBox.style.fontFamily =
        '"Manrope", sans-serif';

    messageBox.style.fontSize =
        "0.75rem";

    messageBox.style.fontWeight =
        "600";

    messageBox.style.boxShadow =
        "0 15px 35px rgba(75,49,95,0.2)";

    messageBox.style.opacity = "0";

    messageBox.style.transition =
        "opacity 0.3s ease";


    document.body.appendChild(messageBox);


    /*
       Animate in
    */

    requestAnimationFrame(() => {

        messageBox.style.opacity = "1";

    });


    /*
       Remove after 3 seconds
    */

    setTimeout(() => {

        messageBox.style.opacity = "0";

        setTimeout(() => {

            messageBox.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   7. NEXT BUTTONS
   ========================================================= */

nextButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /*
           Save current information
        */

        saveCurrentStep();


        /*
           Validate current step
        */

        if (!validateStep(currentStep)) {

            return;

        }


        /*
           Get next step
        */

        const nextStep =
            Number(button.dataset.next);


        /*
           Save again before moving
        */

        saveCurrentStep();


        /*
           Update summary thought
        */

        updateThoughtPreview();


        /*
           Move forward
        */

        showStep(nextStep);

    });

});


/* =========================================================
   8. BACK BUTTONS
   ========================================================= */

backButtons.forEach((button) => {

    button.addEventListener("click", () => {

        saveCurrentStep();

        const previousStep =
            Number(button.dataset.back);

        showStep(previousStep);

    });

});


/* =========================================================
   9. EMOTION SELECTION
   ========================================================= */

emotionOptions.forEach((option) => {

    option.addEventListener("click", () => {

        /*
           Remove selected state
           from all emotion buttons
        */

        emotionOptions.forEach((item) => {

            item.classList.remove("selected");

        });


        /*
           Select current emotion
        */

        option.classList.add("selected");


        /*
           Save emotion
        */

        reflectionData.emotion =
            option.dataset.emotion;


        /*
           Small visual confirmation
        */

        option.style.transform =
            "translateY(-5px)";

        setTimeout(() => {

            option.style.transform = "";

        }, 250);

    });

});


/* =========================================================
   10. EMOTION INTENSITY
   ========================================================= */

if (intensitySlider) {

    intensitySlider.addEventListener("input", () => {

        const value =
            intensitySlider.value;


        reflectionData.intensity =
            Number(value);


        if (intensityValue) {

            intensityValue.textContent =
                `${value} / 10`;

        }

    });

}


/* =========================================================
   11. BEHAVIOR SELECTION
   ========================================================= */

behaviorOptions.forEach((option) => {

    option.addEventListener("click", () => {

        /*
           Remove selection
        */

        behaviorOptions.forEach((item) => {

            item.classList.remove("selected");

        });


        /*
           Select current option
        */

        option.classList.add("selected");


        /*
           Save behavior
        */

        reflectionData.behavior =
            option.textContent.trim();

    });

});


/* =========================================================
   12. THINKING PATTERN SELECTION
   ========================================================= */

patternOptions.forEach((option) => {

    option.addEventListener("click", () => {

        /*
           Remove previous selection
        */

        patternOptions.forEach((item) => {

            item.classList.remove("selected");

        });


        /*
           Select current pattern
        */

        option.classList.add("selected");


        /*
           Save pattern
        */

        reflectionData.pattern =
            option.dataset.pattern;

    });

});


/* =========================================================
   13. UPDATE AUTOMATIC THOUGHT PREVIEW
   ========================================================= */

function updateThoughtPreview() {

    const summaryThought =
        document.getElementById("summaryThought");

    if (!summaryThought) {

        return;

    }


    if (reflectionData.thought) {

        summaryThought.textContent =
            `"${reflectionData.thought}"`;

    }

}


/* =========================================================
   14. FORM SUBMISSION
   ========================================================= */

if (reflectionForm) {

    reflectionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
               Save final information
            */

            saveCurrentStep();


            /*
               Validate final step
            */

            const alternativeThought =
                document.getElementById(
                    "alternativeThought"
                );

            const reframe =
                document.getElementById(
                    "reframe"
                );


            if (!alternativeThought.value.trim()) {

                showMessage(
                    "Add an alternative perspective before completing your reflection."
                );

                alternativeThought.focus();

                return;

            }


            if (!reframe.value.trim()) {

                showMessage(
                    "Write a balanced perspective for your reflection."
                );

                reframe.focus();

                return;

            }


            /*
               Save final values
            */

            reflectionData.alternativeThought =
                alternativeThought.value.trim();

            reflectionData.reframe =
                reframe.value.trim();


            /*
               Generate summary
            */

            generateSummary();

        }
    );

}


/* =========================================================
   15. GENERATE SUMMARY
   ========================================================= */

function generateSummary() {

    /*
       Get summary elements
    */

    const summarySituation =
        document.getElementById(
            "summarySituation"
        );

    const finalThought =
        document.getElementById(
            "finalThought"
        );

    const finalEmotion =
        document.getElementById(
            "finalEmotion"
        );

    const finalIntensity =
        document.getElementById(
            "finalIntensity"
        );

    const finalPattern =
        document.getElementById(
            "finalPattern"
        );

    const finalAlternative =
        document.getElementById(
            "finalAlternative"
        );

    const finalReframe =
        document.getElementById(
            "finalReframe"
        );


    /*
       Insert data
    */

    if (summarySituation) {

        summarySituation.textContent =
            reflectionData.situation ||
            "No situation entered.";

    }


    if (finalThought) {

        finalThought.textContent =
            reflectionData.thought ||
            "No thought entered.";

    }


    if (finalEmotion) {

        finalEmotion.textContent =
            reflectionData.emotion ||
            "Not selected.";

    }


    if (finalIntensity) {

        finalIntensity.textContent =
            reflectionData.intensity
                ? `${reflectionData.intensity}/10`
                : "";

    }


    if (finalPattern) {

        finalPattern.textContent =
            reflectionData.pattern ||
            "Not selected.";

    }


    if (finalAlternative) {

        finalAlternative.textContent =
            reflectionData.alternativeThought ||
            "No alternative perspective entered.";

    }


    if (finalReframe) {

        finalReframe.textContent =
            reflectionData.reframe ||
            "No reframe entered.";

    }


    /*
       Hide form
    */

    reflectionForm.style.display =
        "none";


    /*
       Show summary
    */

    summarySection.classList.add("show");


    /*
       Scroll to summary
    */

    setTimeout(() => {

        const top =
            summarySection.getBoundingClientRect().top
            + window.scrollY
            - 100;

        window.scrollTo({

            top: top,

            behavior: "smooth"

        });

    }, 100);

}


/* =========================================================
   16. START ANOTHER REFLECTION
   ========================================================= */

if (newReflectionButton) {

    newReflectionButton.addEventListener(
        "click",
        () => {

            /*
               Reset data
            */

            reflectionData.situation = "";
            reflectionData.thought = "";
            reflectionData.emotion = "";
            reflectionData.intensity = 5;
            reflectionData.behavior = "";
            reflectionData.reaction = "";
            reflectionData.pattern = "";
            reflectionData.alternativeThought = "";
            reflectionData.reframe = "";


            /*
               Reset form
            */

            if (reflectionForm) {

                reflectionForm.reset();

            }


            /*
               Remove selections
            */

            emotionOptions.forEach((option) => {

                option.classList.remove("selected");

            });


            behaviorOptions.forEach((option) => {

                option.classList.remove("selected");

            });


            patternOptions.forEach((option) => {

                option.classList.remove("selected");

            });


            /*
               Reset intensity
            */

            if (intensitySlider) {

                intensitySlider.value = 5;

            }

            if (intensityValue) {

                intensityValue.textContent =
                    "5 / 10";

            }


            /*
               Hide summary
            */

            summarySection.classList.remove("show");


            /*
               Show form
            */

            reflectionForm.style.display =
                "block";


            /*
               Go back to first step
            */

            showStep(1);

        }
    );

}


/* =========================================================
   17. NAVIGATION LINK BEHAVIOR
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (!target) {

            return;

        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   18. SIMPLE SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".process-card, .library-card, .thought-node"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


/* =========================================================
   19. SIDEBAR CLICK NAVIGATION
   ========================================================= */

progressSteps.forEach((step, index) => {

    step.style.cursor = "pointer";

    step.addEventListener("click", () => {

        /*
           Only allow navigation to
           already completed/current steps
        */

        const requestedStep = index + 1;

        if (requestedStep <= currentStep) {

            showStep(requestedStep);

        }

    });

});


/* =========================================================
   20. INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    showStep(1);

    if (intensitySlider) {

        intensityValue.textContent =
            `${intensitySlider.value} / 10`;

    }

});

