const form = document.getElementById("checkoutForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const payment = document.getElementById("payment");

const errName = document.getElementById("errName");
const errEmail = document.getElementById("errEmail");
const errPhone = document.getElementById("errPhone");
const errAddress = document.getElementById("errAddress");
const errPayment = document.getElementById("errPayment");

const successMsg = document.getElementById("successMsg");

function clearErrors(){
  errName.textContent = "";
  errEmail.textContent = "";
  errPhone.textContent = "";
  errAddress.textContent = "";
  errPayment.textContent = "";
  successMsg.textContent = "";
}

function validate(){
  clearErrors();
  let ok = true;

  if (fullName.value.trim() === "") {
    errName.textContent = "Full name is required.";
    ok = false;
  }

  const emailValue = email.value.trim();

   if (emailValue === "") {
     errEmail.textContent = "Email is required.";
     ok = false;
  } 
   else if (!emailValue.includes("@")) {
     errEmail.textContent = "Email must contain @ symbol.";
     ok = false;
  }

  if (phone.value.trim() === "") {
    errPhone.textContent = "Phone number is required.";
    ok = false;
  }

  if (address.value.trim() === "") {
    errAddress.textContent = "Address is required.";
    ok = false;
  }

  if (payment.value === "") {
    errPayment.textContent = "Choose payment method.";
    ok = false;
  }

  return ok;
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // не отправляем на сервер

  const ok = validate();
  if (ok) {
    successMsg.textContent = "Order was successfully placed!";
    form.reset();
  }
});
