const nameField = document.getElementById('name');
nameField.focus();

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

