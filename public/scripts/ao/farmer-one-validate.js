const validators = {
  "unique-id": validateUniqueId,
  "full-name": validateFullName,
  password: validatePassword,
  gender: validateGender,
  "date-of-birth": validateDateOfBirth,
  "phone-number": validatePhoneNumber,
  "nin-number": validateNinNumber,
  ward: validateWard,
  "residence-type": validateResidenceType,
  "residence-duration": validateResidenceDuration,
  "residence-directions": validateResidenceDirections,
  "activities-undertaken": validateActivitiesUndertaken,
};

const farmerOneForm = document.getElementById("new-farmer-one");

farmerOneForm.onsubmit = function () {
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

  const regex = /^FO-\d{4}$/;

  if (!regex.test(uniqueId))
    return 'Unique ID should be of the form "FO-XXXX", where X is a digit(0-9)';

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

function validateGender(value) {
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

function validateWard(value) {
  const ward = value && value.trim();

  if (!ward) return "This field is required";

  return "";
}

function validateResidenceType(value) {
  const residenceType = value && value.trim();

  if (!residenceType) return "This field is required";

  return "";
}

function validateResidenceDuration(value) {
  const durationOfStay = value && value.trim();

  if (!durationOfStay) return "This field is required";

  if (Number(durationOfStay) < 10)
    return "Only residents of 10 or more years are legible";

  return "";
}

function validateResidenceDirections(value) {
  const residenceDirections = value && value.trim();

  if (!residenceDirections) return "This field is required";

  return "";
}

function validateActivitiesUndertaken(value) {
  const activitiesUndertaken = value && value.trim();

  if (!activitiesUndertaken) return "This field is required";

  return "";
}
