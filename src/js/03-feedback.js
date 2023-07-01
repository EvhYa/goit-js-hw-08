import _ from 'lodash';

const feadbackForm = document.querySelector('.feedback-form');

// console.log(feadbackForm[0].value);

feadbackForm.addEventListener('input', _.throttle(handlerInput, 500));
feadbackForm.addEventListener('click', formSubmit);

let formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

function handlerInput(evt) {
  if (evt.target.type === 'email') {
    formData.email = evt.target.value;
    // console.log(formData);
  } else if (evt.target.type === 'textarea') {
    formData.message = evt.target.value;
    // console.log(formData);
  }
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// let inputs = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

feadbackForm[0].value = formData.email || '';
feadbackForm[1].value = formData.message || '';

// console.log(inputs);

function formSubmit(evt) {
  if (evt.target.type === 'submit') {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')) || {});
    localStorage.removeItem('feedback-form-state');
    feadbackForm[0].value = '';
    feadbackForm[1].value = '';
    formData = {};
  }
}
