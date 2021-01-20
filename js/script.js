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

function validateName(name) {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);
    const nameHint = document.getElementById('name-hint');

    showHint(nameIsValid,nameHint);
     
    return nameIsValid;
}

function validateEmail(email) {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    const emailHint = document.getElementById('email-hint');
    
    if(emailField.value === ""){
        emailHint.textContent = "Please provide an email address";
    } else{
        emailHint.textContent = "Email address must be formatted correctly";
    };
        
    showHint(emailIsValid, emailHint);

    return emailIsValid;
}

function validateActivities() {
    let checkedAmount = 0;
    let activitiesAreValid;
    const activitiesHint = document.getElementById('activities-hint');
    console.log(activitiesHint.parentElement);

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

nameField.focus();
colorSelect.style.display = 'none';
otherJobRole.style.display = "none";
paymentMethod[1].selected = true;
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

//Listeners

jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value="other") {
        otherJobRole.style.display = "block";
    };
});

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

checkboxes.forEach( (checkbox) => {
    checkbox.addEventListener('focus', (e)=> {
        const focused = e.target;
        const focusedLabel = focused.parentNode;
        focusedLabel.classList.add('focus');
    });
});

checkboxes.forEach( (checkbox) => {
    checkbox.addEventListener('blur', (e)=> {
        const blurred = e.target;
        const blurredLabel = blurred.parentNode;
        blurredLabel.classList.remove('focus');
    });
});

registerForActivities.addEventListener('change', (e) => {
    const clicked = e.target;
    const eventTime = clicked.getAttribute('data-day-and-time');
    console.log(eventTime);
    const eventPrice = parseInt(clicked.getAttribute('data-cost'));
     
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

nameField.addEventListener('keyup', () => {
    validateName(nameField);
});

//Submission and Errors

form.addEventListener('submit', (e)=>{
    let validCheck = [];
  
    validCheck.push(validateName(nameField));
    validCheck.push(validateEmail(emailField));
    validCheck.push(validateActivities());

    if(paymentMethod.value === 'credit-card'){
        validCheck.push(validateCreditCard());
    };
    
    if (validCheck.includes(false)){
        e.preventDefault();
    };
  
});
















