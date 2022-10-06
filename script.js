const main = document.getElementById('main');
const form = document.getElementById('calculation');
const bill = document.getElementById('billAmount');
const people = document.getElementById('peopleAmount');
const calculateBtn = document.getElementById('calculate-btn');


const billSmallText = document.createElement('small');
const peopleSmallText = document.createElement('small');

const resultSection = document.createElement('section');
const resultContainer = document.createElement('div');
const resultHeader = document.createElement('header');
const resultHeaderText = document.createElement('h5');
const resultDateText = document.createElement('p');
const resultHeaderBorder = document.createElement('div');

const resultRowDiv = document.createElement('div');

const eachPersonDiv = document.createElement('div');
const eachPersonTotalTitle = document.createElement('p');
const eachPersonTotalValue = document.createElement('p');

const allinTotalDiv = document.createElement('div');
const allinTotalTitle = document.createElement('p');
const allinTotalValue = document.createElement('p');

const notNumberMsg = 'Input value must be a number';

let isBillValid = false;
let isPeopleValid = false;

form.addEventListener('change', () => {
  if (isBillValid && isPeopleValid) {
    calculateBtn.classList.remove('disable');
    calculateBtn.disabled = false;
  } else {
    calculateBtn.classList.add('disable');
    calculateBtn.disabled = true;
  }
});

calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (isBillValid && isPeopleValid) {
    calculateResult();
  }
});

function calculateResult() {
  const datetime = new Date();

  let eachTotal = (Number(bill.value) / Number(people.value));

  resultHeaderText.textContent = 'Result';


  resultRowDiv.classList.add('row');
  eachPersonTotalTitle.textContent = 'Total for each person';
  eachPersonTotalTitle.classList.add('bold-title', 'text-left');
  eachPersonTotalValue.textContent = (
    Math.round(eachTotal * 100) / 100
  ).toFixed(2);
  eachPersonTotalValue.classList.add('bold-title', 'text-right');


  resultSection.id = 'result';
  resultSection.classList.add('shadow');
  resultContainer.classList.add('container');
  resultDateText.classList.add('date');
  resultHeaderBorder.classList.add('border');


  resultHeader.appendChild(resultHeaderText);
  resultHeader.appendChild(resultDateText);
  resultHeader.appendChild(resultHeaderBorder);
  resultContainer.appendChild(resultHeader);
  resultSection.appendChild(resultContainer);




  eachPersonDiv.classList.add('row');
  eachPersonDiv.appendChild(eachPersonTotalTitle);
  eachPersonDiv.appendChild(eachPersonTotalValue);
  resultContainer.appendChild(eachPersonDiv);

  main.appendChild(resultSection);

}

bill.addEventListener('change', (e) => {
  const invalidNumberMsg =
    'Bill amount must be a positive value that is more than 0';

  if (isNaN(e.target.value)) {
    e.target.value = '';

    billSmallText.textContent = notNumberMsg;
    billSmallText.classList.add('block', 'error-text');
    bill.insertAdjacentElement('afterend', billSmallText);
    bill.classList.add('error-border');
    isBillValid = false;
  } else if (e.target.value <= 0) {
    e.target.value = '';

    billSmallText.textContent = invalidNumberMsg;
    billSmallText.classList.add('block', 'error-text');
    bill.insertAdjacentElement('afterend', billSmallText);
    bill.classList.add('error-border');
    isBillValid = false;
  } else {
    e.target.value = Number(e.target.value).toString();
    bill.classList.remove('error-border');
    billSmallText.remove();
    isBillValid = true;
  }

  return isBillValid;
});

people.addEventListener('change', (e) => {
  const invalidNumberMsg =
    'People input has to be a positive whole number that is higher than 0';
  const tooManyPeopleMsg = 'Please stick to a number between 1 and 10';

  if (isNaN(e.target.value)) {
    e.target.value = '';

    peopleSmallText.textContent = notNumberMsg;
    peopleSmallText.classList.add('block', 'error-text');
    people.insertAdjacentElement('afterend', peopleSmallText);
    people.classList.add('error-border');
    isPeopleValid = false;
  } else if (e.target.value <= 0 || e.target.value % 1 !== 0) {
    e.target.value = '';

    peopleSmallText.textContent = invalidNumberMsg;
    peopleSmallText.classList.add('block', 'error-text');
    people.insertAdjacentElement('afterend', peopleSmallText);
    people.classList.add('error-border');
    isPeopleValid = false;
  } else if (e.target.value > 10) {
    e.target.value = '';

    peopleSmallText.textContent = tooManyPeopleMsg;
    peopleSmallText.classList.add('block', 'error-text');
    people.insertAdjacentElement('afterend', peopleSmallText);
    people.classList.add('error-border');
  } else {
    e.target.value = Number(e.target.value).toString();
    people.classList.remove('error-border');
    peopleSmallText.remove();
    isPeopleValid = true;
  }

  return isPeopleValid;
});