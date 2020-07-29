let button = document.querySelector('#example1')
button.addEventListener('click', e => {
  console.log(e);
  let message = document.createElement('span');
  message.innerText = 'loading';
  message.setAttribute('tabindex', '-1');
  let container = e.target.parentElement;
  container.innerHTML = `<div>test test test</div><div>test test test</div>`;
  container.appendChild(message);
  message.focus();
})

let button2 = document.querySelector('#example2')
button2.addEventListener('click', e => {
  console.log(e);
  let message = document.createElement('span');
  message.innerText = 'loading'
  message.setAttribute('tabindex', '-1');
  let container = e.target.parentElement;
  container.innerHTML = '';
  container.appendChild(message);
  
  setTimeout(function() {
    message.focus();
  }, 500);
})

let button3 = document.querySelector('#example3')
button3.addEventListener('click', e => {
  console.log(e);
  let focusFix = document.querySelector('#focus-fix');
  let message = document.createElement('span');
  message.innerText = 'loading'
  message.setAttribute('tabindex', '-1');
  let container = e.target.parentElement;
  container.innerHTML = '';
  container.appendChild(message);
  focusFix.focus();
  message.focus();
})

let button4 = document.querySelector('#example4')
button4.addEventListener('click', e => {
  console.log(e);
  let focusFix = document.querySelector('#focus-fix');
  let message = document.createElement('span');
  message.innerText = 'loading'
  message.setAttribute('tabindex', '-1');
  let container = e.target.parentElement;
  container.innerHTML = '';
  container.appendChild(message);
  focusFix.focus();
  setTimeout(function() {
    message.focus();
  }, 10);
})

let button5 = document.querySelector('#example5')
button5.addEventListener('click', e => {
  console.log(e);
  let message = document.createElement('span');
  message.innerText = 'loading'
  message.setAttribute('tabindex', '-1');
  let container = e.target.parentElement;
  e.target.classList.add('visually-hidden');
  container.appendChild(message);
  message.focus();
  e.target.remove();
})

