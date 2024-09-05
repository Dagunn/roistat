document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const inputs = form.querySelectorAll('.form__input');
  const checkbox = document.getElementById('consentCheckbox');
  const phone = document.querySelector('.phone');
  const closeForm = document.getElementById('close');
  const formOverlay = document.getElementById('overlay');
  const btnReg = document.getElementById('btnReg');
  const burgerMenu = document.getElementById('burgerMenu');
  const errors = {
    name: document.getElementById('nameError'),
    site: document.getElementById('siteError'),
    phone: document.getElementById('phoneError'),
    policy: document.getElementById('policyError')
  };

  form.addEventListener('submit', function (event) {
    let isValid = true;


    inputs.forEach(input => {
      input.classList.remove('invalid-input', 'valid-input');
      errors[input.name].style.display = 'none';
    });
    errors.policy.style.display = 'none';


    inputs.forEach(input => {
      if (input.value === '') {
        isValid = false;
        input.classList.add('invalid-input');
        errors[input.name].style.display = 'block';
      } else {
        input.classList.remove('valid-input');
      }
    });


    if (phone.value.length < 12) {
      isValid = false;
      errors.phone.style.display = 'block';
    } else {
      errors.phone.style.display = 'none';
    }


    if (!checkbox.checked) {
      isValid = false;
      errors.policy.style.display = 'block';
    } else {
      errors.policy.style.display = 'none';
    }


    if (!isValid) {
      event.preventDefault();
    }
  });

  closeForm.addEventListener('click', function () {
    form.style.display = 'none';
    formOverlay.style.display = 'none';

  });

  btnReg.addEventListener('click', function () {
    form.style.display = 'block';
    formOverlay.style.display = 'block';
  });

  burgerMenu.addEventListener('click', function () {
    form.style.display = 'block';
    formOverlay.style.display = 'block';
  });
});


$(".name").on('input', function (e) {
  this.value = this.value.replace(/[^a-zA-ZäöüßÄÖÜẞ\s.]/g, '');
});
$(".phone").on('input', function (e) {
  this.value = "+" + this.value.replace(/[^0-9\.]/g, '');
});

$(function () {
  $(".phone").one('focus', function () {
    $(this).val("+7")
  });
});

