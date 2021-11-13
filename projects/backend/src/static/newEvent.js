const select = document.querySelector('#category');
const selectInput = document.querySelector('#categoryOther');

select.addEventListener('change', (event) => {
  const target = event.target;
  if (target.value === 'Другое') {
    selectInput.classList.remove('hidden');
    selectInput.required = true;
  } else {
    selectInput.classList.add('hidden');
    selectInput.required = false;
    selectInput.value = '';
  }
});
