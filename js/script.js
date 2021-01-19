const nameField = document.getElementById('name');
nameField.focus();

const emailField = document.getElementById('email');

const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = "none";

const jobRoleSelect = document.getElementById('title');
jobRoleSelect.addEventListener('change', (e) => {
    console.log(e.target.value);
    if (e.target.value="other") {
        otherJobRole.style.display = "block";
    };
});

const colorSelect = document.getElementById('shirt-colors');
colorSelect.style.display = 'none';

const colorOptions = document.querySelector('#color');

const designSelect = document.getElementById('design');
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

const totalCostLocation = document.getElementById('activities-cost');
const registerForActivities = document.getElementById('activities');
let totalCost = 0;

registerForActivities.addEventListener('change', (e) => {
    const clicked = e.target;
    const eventTime = clicked.getAttribute('data-day-and-time');
    const eventPrice = parseInt(clicked.getAttribute('data-cost'));
 
    if (clicked.checked) {
        totalCost += eventPrice;
    } else {
        totalCost -= eventPrice;
    };
    totalCostLocation.textContent = `Total: $${totalCost}`;
    
});

const paymentMethod = document.getElementById('payment');
const creditcardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const paymentSections = [creditcardDiv, paypalDiv, bitcoinDiv];

paymentMethod[1].selected = true;
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

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

const form = document.querySelector('form');

form.addEventListener('submit', ()=>{


});

function validateName(name) {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);
    return nameIsValid;
}

function validateEmail(email) {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    return emailIsValid;
}

function validateActivites() {

}

function validateCreditCard() {
    let creditCardIsValid;
    const creditcardNumber = document.getElementById('cc-num').value;
    const creditcardNumIsValid = /^\d{13}\d?\d?\d?$/.test(creditcardNumber);
    
    const zipCode = document.getElementById('zip').value;
    const zipCodeIsValid = /^\d{5}$/.test(zipCode);

    const cvv = document.getElementById('cvv').value;
    const cvvIsValid = /^\d{3}$/.test(cvv);

    if (creditcardNumIsValid && zipCodeIsValid && cvvIsValid) {
        creditCardIsValid = true;
    } else {
        creditCardIsValid = false;
    }

    return creditCardIsValid;

}