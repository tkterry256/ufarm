const validators = {
  "unique-id": validateUniqueId,
  "full-name": validateFullName,
  password: validatePassword,
  gender: validateCategory,
  "date-of-birth": validateDateOfBirth,
  "phone-number": validatePhoneNumber,
  "nin-number": validateNinNumber,
  "activities-undertaken": validateActivitiesUndertaken,
};

const registerForm = document.getElementById("new-urban-farmer");

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
  const uniqueId = value && value.trim();

  if (!uniqueId) return "This field is required";

  const regex = /^UF-\d{4}$/;

  if (!regex.test(uniqueId))
    return 'Unique ID should be of the form "UF-XXXX", where X is a digit(0-9)';

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

function validateCategory(value) {
  const gender = value && value.trim();

  if (!gender) return "This field is required";

  return "";
}

function validateDateOfBirth(value) {
  const dateOfBirth = value && value.trim();

  if (!dateOfBirth) return "This field is required";

  const year = Number(dateOfBirth.split("-")[0]);
  const currentYear = new Date().getFullYear();

  if (currentYear - year < 10)
    return "No users of less than 10 years of age allowed";

  return "";
}

function validatePhoneNumber(value) {
  const phoneNumber = value && value.trim();

  if (!phoneNumber) return "This field is required";

  const regex = /0\d{9}/;

  if (!regex.test(phoneNumber))
    return "Phone number must start with 0 followed by 9 digits with no spaces";

  return "";
}

function validateNinNumber(value) {
  const ninNumber = value && value.trim();

  if (!ninNumber) return "This field is required";

  if (ninNumber.length !== 13) return "NIN must be 13 characters";

  return "";
}

function validateActivitiesUndertaken(value) {
  const activitiesUndertaken = value && value.trim();

  if (!activitiesUndertaken) return "This field is required";

  return "";
}
