const form = document.getElementById("signup");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const min = 3,
  max = 25;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "") {
    setError(username, "имя обязательное поле");
  } else if (!isBetween(usernameValue.length, min, max)) {
    setError(
      username,
      `имя должно быть пределах  ${min} и ${max} символов.`
    );
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "email обязательное поле");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "email должен содержать @");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Пароль обязательное поле");
  } else if (!isPasswordSecure(password)) {
    setError(
      password,
      "Пароль не должен быть короче 8 символов и содежать спец символы (!@#$%^&*)"
    );
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Пожалуйста повторите пароль");
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "Пароли не совпадают");
  } else {
    setSuccess(confirmPassword);
  }
};
