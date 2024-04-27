function validateForm() {
  const form = document.getElementById('form-register');
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  const nameRegex = /^.{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,11}$/;
  const passwordRegex = /^.{8,}$/;

  let valid = true;

  if (!nameRegex.test(name)) {
    showToast('Nome deve ter no mínimo 3 caracteres.');
    valid = false;
  }

  if (!emailRegex.test(email)) {
    showToast('E-mail não é válido.');
    valid = false;
  }

  if (!phoneRegex.test(phone)) {
    showToast('Telefone não é válido.');
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    showToast('Senha deve ter no mínimo 8 caracteres.');
    valid = false;
  }

  if (valid) {
    form.submit();
  }

}

document.getElementById('submit-btn').addEventListener('click', function (event) {
  event.preventDefault();

  if (validateForm()) {
    console.log('Formulário válido. Pronto para enviar.');
  }
});