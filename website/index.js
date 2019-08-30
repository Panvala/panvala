document.addEventListener('DOMContentLoaded', () => {
  // setup event listeners
  const submitButton = document.getElementById('email-subscribe-button');
  submitButton.addEventListener('click', handleClickSubmit);
  const closeModalButton = document.getElementById('email-subscribe-modal-close');
  closeModalButton.addEventListener('click', handleClickClose);
});

function handleClickClose(e) {
  e.preventDefault();
  const modal = document.getElementById('email-subscribe-modal');
  modal.setAttribute('class', 'vh-100 dn w-100 bg-black-80 absolute--fill absolute z-999');
}

function handleClickSubmit(e) {
  e.preventDefault();
  const emailSubscribeInput = document.getElementById('email-subscribe-input');
  if (validateEmail(emailSubscribeInput.value)) {
    const modal = document.getElementById('email-subscribe-modal');
    modal.setAttribute('class', 'vh-100 dt w-100 bg-black-80 absolute--fill absolute z-999');
  } else {
    console.log('invalid email');
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
