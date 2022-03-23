const form = document.getElementById('form');
const input = document.getElementById('input');
const errorContainer = document.getElementById('error-container');

let errors = {
  hasSpace: false,
  badChars: false,
};

function clearErros() {
  errors = {
    ...errors,
    hasSpace: false,
    badChars: false,
  };
}

let pass = '';

input.addEventListener('change', (e) => {
  clearErros();
  errorContainer.innerHTML = '';
  const { value } = e.target;
  pass = value;
  const strArray = value.split('');
  for (let i = 0; i < strArray.length; i++) {
    const charCode = value.charCodeAt(i);

    if (charCode === 32) {
      errors.hasSpace = true;
    } else if (
      charCode < 65 ||
      (charCode > 90 && charCode < 97) ||
      charCode > 122
    ) {
      errors.badChars = true;
    }
  }

  if (errors.hasSpace) {
    errorContainer.innerHTML = 'Niee może być spacji';
  }
  if (errors.badChars) {
    errorContainer.innerHTML += '<br>Możesz użyć tylko a-z lub A-Z';
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (errors.hasSpace || errors.badChars) {
    if (errors.hasSpace) {
      errorContainer.innerHTML = 'Niee może być spacji';
    }
    if (errors.badChars) {
      errorContainer.innerHTML += '<br>Możesz użyć tylko a-z lub A-Z';
    }
    return;
  } else {
    const res = await fetch('', {
      method: 'POST',
      body: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(pass);
    const data = await res.json();

    const div = document.createElement('div');
    div.innerHTML = data;
    form.appendChild(div);
  }
 
});
