//Variable Declarations

const form = document.querySelector('form');

const nameField = document.getElementById('name');

const emailField = document.getElementById('email');

const otherJobRole = document.getElementById('other-job-role');

const checkboxDiv = document.getElementById('activities-box');

const checkboxes = document.querySelectorAll('input[type=checkbox]');

const jobRoleSelect = document.getElementById('title');

const colorSelect = document.getElementById('shirt-colors');

const colorOptions = document.querySelector('#color');

const designSelect = document.getElementById('design');

const totalCostLocation = document.getElementById('activities-cost');
const registerForActivities = document.getElementById('activities');
let totalCost = 0;

const paymentMethod = document.getElementById('payment');
const creditcardDiv = document.getElementById('credit-card');
const creditcardNumber = document.getElementById('cc-num');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const paymentSections = [creditcardDiv, paypalDiv, bitcoinDiv];

//Helper Functions


//showHint function will run in each validation function and shows/hides the error message for each required section
//@isValid -- should be a Boolean value indicating whether the field was valid 
//@hint -- the location of the hint item for each required section

function showHint(isValid, hint) {
    if(!isValid){
        //hint.parentElement.className = 'not-valid';
        hint.parentElement.classList.add('not-valid');
        hint.parentElement.classList.remove('valid');
        hint.classList.remove('hint');
    } else {
       // hint.parentElement.className = 'valid';
        hint.parentElement.classList.add('valid');
        hint.parentElement.classList.remove('not-valid');
        hint.classList.add('hint');
    };
}

//validateName function looks at the name field and determines whether it has been correctly filled out
//@name -- the location of the name input box

function validateName(name) {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);
    const nameHint = document.getElementById('name-hint');

    showHint(nameIsValid,nameHint);
     
    return nameIsValid;
}


//validateEmail function inspects the email field and determines whether it has been correctly filled out
//@email -- the location of the email input field

function validateEmail(email) {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    const emailHint = document.getElementById('email-hint');
    
    //This if statement modifies the hint depending on if the email field is blank vs incorrect
    if(emailField.value === ""){
        emailHint.textContent = "The email address field cannot be blank";
    } else{
        emailHint.textContent = "Email address must be formatted correctly";
    };

    showHint(emailIsValid, emailHint);

    return emailIsValid;
}


//validateActivities function inspects the form to make sure at least one event has been selected

function validateActivities() {
    let checkedAmount = 0;
    let activitiesAreValid;
    const activitiesHint = document.getElementById('activities-hint');

    for (let i = 0; i<checkboxes.length; i++) {
        if(checkboxes[i].checked){
            checkedAmount++
        };
    };

    if (checkedAmount > 0){
        activitiesAreValid = true;
    } else {
        activitiesAreValid = false;
    };
    
    showHint(activitiesAreValid, activitiesHint);

    return activitiesAreValid;
}

//validateCreditCard function looks at the credit card number field, the zip code field, and the ccv field to  see if they contain valid input

function validateCreditCard() {

    let creditCardIsValid;
    const creditcardNumIsValid = /^\d{13}\d?\d?\d?$/.test(creditcardNumber.value);
    const cardNumberHint = document.getElementById('cc-hint');

    showHint(creditcardNumIsValid, cardNumberHint);

    const zipCode = document.getElementById('zip').value;
    const zipCodeIsValid = /^\d{5}$/.test(zipCode);
    const zipCodeHint = document.getElementById('zip-hint');

    showHint(zipCodeIsValid, zipCodeHint);

    const cvv = document.getElementById('cvv').value;
    const cvvIsValid = /^\d{3}$/.test(cvv);
    const cvvHint = document.getElementById('cvv-hint');

    showHint(cvvIsValid, cvvHint);

    if (creditcardNumIsValid && zipCodeIsValid && cvvIsValid) {
        creditCardIsValid = true;
    } else {
        creditCardIsValid = false;
    }

    return creditCardIsValid;
}


//Initial Form Setup

//Form will initialize with nameField as the focused input box and the credit card pre-selected as the payment choice
//colorSelect will be hidden intially, until the shirt design is chosen
//The input box for "other job role" will be hidden, unless "Other" is chosen from the role drop-down

nameField.focus();
colorSelect.style.display = 'none';
otherJobRole.style.display = "none";
paymentMethod[1].selected = true;
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

//Listeners

//Listens for changes to the role selection. If other is chosen, a text input box will generate.
jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value="other") {
        otherJobRole.style.display = "block";
    };
});


//Listens for changes to the shirt design dropdown. Depending on design choice, different colors will appear as options.
designSelect.addEventListener('change', (e) => {
    colorSelect.style.display = 'block';
    const designChoice = e.target.value;
    if(designChoice ==='heart js') {
        
        for (let i=1;i<colorOptions.length;i++) {
            
            const dataTheme = colorOptions[i].getAttribute('data-theme');
            
            if(dataTheme !== designChoice){
                colorOptions[i].style.display = 'none';
            } else {
                colorOptions[i].style.display = 'block';
                colorOptions[i].selected = true;
            };
        };
    } else if (designChoice === 'js puns') {
         
        for (let i=1;i<colorOptions.length;i++) {
            
            const dataTheme = colorOptions[i].getAttribute('data-theme');
            
            if(dataTheme !== designChoice){
                colorOptions[i].style.display = 'none';
            } else {
                colorOptions[i].style.display = 'block';
                colorOptions[i].selected = true;
            };
        };
    };
});

//Listens for the page focus landing on an activity checkbox, adds 'focus' class to corresponding label
//Makes it more obvious which checkbox is being focused on
checkboxes.forEach( (checkbox) => {
    checkbox.addEventListener('focus', (e)=> {
        const focused = e.target;
        const focusedLabel = focused.parentNode;
        focusedLabel.classList.add('focus');
    });
});

//Listens for the page focus moving away from an activity checkbox. Removes focus class from corresponding label.
checkboxes.forEach( (checkbox) => {
    checkbox.addEventListener('blur', (e)=> {
        const blurred = e.target;
        const blurredLabel = blurred.parentNode;
        blurredLabel.classList.remove('focus');
    });
});

//Listens for changes to the activity checkboxes. If an item is selected, the cost is added to the total cost. If item is de-selected, the cost is subtracted.
//Also ensures attendee cannot sign up for two events at the same time
registerForActivities.addEventListener('change', (e) => {
    const clicked = e.target;
    const eventTime = clicked.getAttribute('data-day-and-time');
    const eventPrice = parseInt(clicked.getAttribute('data-cost'));
     
    //for loop checks to make sure there are no time conflicts
    for(let i = 0; i < checkboxes.length; i++){
        const compareTime = checkboxes[i].getAttribute('data-day-and-time');
        
        if(eventTime === compareTime && clicked !== checkboxes[i]){
            checkboxes[i].disabled = true;

            if(clicked.checked){
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            };
        }

    };

    if (clicked.checked) {
        totalCost += eventPrice;

    } else {
        totalCost -= eventPrice;
    };
    totalCostLocation.textContent = `Total: $${totalCost}`;
    
});

//Listens for changes to the payment method, and displays appropriate input boxes
paymentMethod.addEventListener('change', (e) => {
    const selectedPayment = e.target.value;
    for (let i=0; i <paymentSections.length; i++) {
        if(selectedPayment === paymentSections[i].id) {
            paymentSections[i].style.display = 'block';
        } else {
            paymentSections[i].style.display = 'none';
        };
    };
});

//Listens for keystrokes in name field in order to real time validate
nameField.addEventListener('keyup', () => {
    validateName(nameField);
});

//Submission and Errors

//Listens for submit event, either via "enter" key or submit button, then calls validation helper functions
//If all validations pass, the form submits
//If any validation fails, the form preventsDefault and generates hints for user correction
form.addEventListener('submit', (e)=>{
    let validCheck = [];
  
    validCheck.push(validateName(nameField));
    validCheck.push(validateEmail(emailField));
    validCheck.push(validateActivities());

    //Determines if credit card validation needs to happen, or if alternate payment method has been selected.
    if(paymentMethod.value === 'credit-card'){
        validCheck.push(validateCreditCard());
    };
    
    if (validCheck.includes(false)){
        e.preventDefault();
    };
  
});
















