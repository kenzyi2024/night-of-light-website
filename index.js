/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

***/

// Step 1: Select the theme button
const themeButton = document.getElementById("theme-toggle");


// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        themeButton.textContent = "Dark Mode";
    }
    else {
        themeButton.textContent = "Light Mode";
    }
};

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);


/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

***/

// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById("rsvp-button");


const addParticipant = (person) => {
  const name = document.getElementById("rsvp-name").value;
  const state = document.getElementById("rsvp-state").value;

  const participantList = document.querySelector(".rsvp-participants");
  const newParticipant = document.createElement("p");
  newParticipant.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd!`;
  document.querySelector(".rsvp-participants").appendChild(newParticipant);
  };

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  const person = {
    name: document.getElementById("rsvp-name").value,
    email: document.getElementById("rsvp-email").value,
    state: document.getElementById("rsvp-state").value
  };
  
  event.preventDefault(); // Prevent form from reloading the page

  let containsErrors = false;
  const rsvpInputs = document.getElementById("rsvp-form").elements;

  // Loop through each input field
  for (let i = 0; i < rsvpInputs.length; i++) {
    let input = rsvpInputs[i];

    if (input.type !== "submit" && input.value.trim().length < 2) {
      containsErrors = true;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  }

  // Step 3: If valid, call addParticipant and clear form
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);
    


    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
  
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpButton.addEventListener("click", validateForm);

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/

let rotateFactor = 0;
let modalImage = document.getElementById("modal-image");

const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  } else {
    rotateFactor = 0;
  }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalText = document.getElementById("modal-text");

  // Show modal
  modal.classList.add("show");  // when opening


  // Set personalized text
  modalText.textContent = `Thanks for RSVPing, ${person.name}! Can't wait to see you!`;

  // Start image animation
  let intervalId = setInterval(animateImage, 500);

  // Hide modal after 5 seconds
  setTimeout(() => {
    modal.classList.remove("show"); // when hiding
    clearInterval(intervalId);
  }, 5000);
};
