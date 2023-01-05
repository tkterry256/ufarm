const validators = {
  "unique-id": validateUniqueId,
  "full-name": validateFullName,
  password: validatePassword,
};

const registerForm = document.getElementById("register");

registerForm.onsubmit = function () {
  const shouldSubmit = Object.keys(validators).reduce(
    (acc, key) => validateInput(key, validators[key]) && acc,
    true
  );

  return shouldSubmit;
};

function validateInput(inputId, validate, inputErrorId) {
  const inputValue = document.getElementById(inputId).value;
  const inputError = document.getElementById(
    inputErrorId || `${inputId}-error`
  );

  inputError.textContent = validate(inputValue);

  return !inputError.textContent;
}

Object.keys(validators).forEach((key) => {
  const input = document.getElementById(key);
  const inputError = document.getElementById(`${key}-error`);

  input.oninput = function () {
    inputError.textContent = "";
  };
});

function validateUniqueId(value) {
  const email = value && value.trim();

  if (!email) return "This field is required";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) return "Invalid Email";

  return "";
}

function validateFullName(value) {
  const fullName = value && value.trim();

  if (!fullName) return "This field is required";

  if (fullName.length < 5) return "Name should have a minimum of 5 characters";

  if (fullName.length > 50)
    return "Name should have a maximum of 50 characters";

  return "";
}

function validatePassword(value) {
  if (!value) return "This field is required";

  return "";
}
