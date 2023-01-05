const validators = {
  name: validateName,
  category: validateCategory,
  type: validateType,
  "unit-price": validateUnitPrice,
  quantity: validateQuantity,
  "mode-of-payment": validateModeOfPayment,
  "mode-of-delivery": validateModeOfDelivery,
  image: validateImage,
};

const loginForm = document.getElementById("new-product");

loginForm.onsubmit = function () {
  const shouldSubmit = Object.keys(validators).reduce(
    (acc, key) => validateInput(key, validators[key]) && acc,
    true
  );

  return shouldSubmit;
};

function validateInput(inputId, validate) {
  const inputElement = document.getElementById(inputId);
  const inputValue = inputElement.value;
  const inputError = document.getElementById(`${inputId}-error`);

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

function validateName(value) {
  const name = value && value.trim();

  if (!name) return "This field is required";

  if (name.length < 3) return "Name should have a minimum of 3 characters";

  return "";
}

function validateCategory(value) {
  const category = value && value.trim();

  if (!category) return "This field is required";

  return "";
}

function validateType(value) {
  const type = value && value.trim();

  if (!type) return "This field is required";

  return "";
}

function validateUnitPrice(value) {
  const unitPrice = value && value.trim();

  if (!unitPrice) return "This field is required";

  return "";
}

function validateQuantity(value) {
  const quantity = value && value.trim();

  if (!quantity) return "This field is required";

  return "";
}

function validateModeOfPayment(value) {
  const modeOfPayment = value && value.trim();

  if (!modeOfPayment) return "This field is required";

  return "";
}

function validateModeOfDelivery(value) {
  const modeOfDelivery = value && value.trim();

  if (!modeOfDelivery) return "This field is required";

  return "";
}

function validateImage(value) {
  const image = value;

  if (!image) return "This field is required";

  return "";
}
