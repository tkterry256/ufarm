const validators = {
  "unique-id": validateUniqueId,
  password: validatePassword,
};

const loginForm = document.getElementById("login");

loginForm.onsubmit = function () {
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
  const uniqueId = value && value.trim();

  if (!uniqueId) return "This field is required";

  return "";
}


function validatePassword(value) {
  if (!value) return "This field is required";

  return "";
}