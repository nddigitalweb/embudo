//generate modal
function generateContainer() {
  const modalContainer = createElement(
    "div",
    "modal-container",
    "d-flex",
    "align-items-center",
    "flex-column",
    "justify-content-center"
  );
  const close = () => {
    modalContainer.remove();
  };
  return { modalContainer, close };
}
function generateModal() {
  const { modalContainer, close } = generateContainer();
  const modal = createElement("div", "modal");
  const closeBtn = createElement("button", null, "main", "bg-secondary");
  closeBtn.textContent = "Cancelar";
  closeBtn.addEventListener("click", close);
  modalContainer.appendChild(modal);
  modal.appendChild(generateForm());
  modalContainer.appendChild(closeBtn);
  document.body.appendChild(modalContainer);
}
let company, employees, email;

function setCompany(newValue) {
  company = newValue;
  updateHref();
}
function setEmail(newValue) {
  email = newValue;
  updateHref();
}
function setEmployees(newValue) {
  employees = newValue;
  updateHref();
}

function generateForm() {
  const form = createElement("form", "modal-form");
  form.appendChild(createInput("Empresa", null, company, setCompany));
  form.appendChild(createInput("Email", null, email, setEmail));
  form.appendChild(
    createInput("Cantidad de Empleados", null, employees, setEmployees)
  );
  const a = createElement("a", "submit-form", "main");
  a.textContent = "Enviar";
  a.setAttribute('target', '_blank')
  a.addEventListener('click', addSubmit)
  form.appendChild(a);
  return form;
}
//send data to firebase

//create whatsapp message
function updateHref() {
  const template = `https://api.whatsapp.com/send?phone=+541126655209&text=QUIERO+MI+ANALISIS+%F0%9F%94%A5%0A%0A${company}+%F0%9F%8F%AD%0A${email}+%E2%9C%89%EF%B8%8F%0A${employees}+%F0%9F%A7%91`;
  const submit = document.getElementById("submit-form");
  if (company?.trim() != '' && email?.trim() != '' && employees?.trim() != '') submit.setAttribute("href", template);
}
//utilities

function createElement(elementName, id, ...rest) {
  const element = document.createElement(elementName);
  element?.setAttribute("id", id);
  if (rest) rest.forEach((className) => element.classList.add(className));
  return element;
}

function createInput(placeholder, id, value, onchange) {
  const input = document.createElement("input");
  input.setAttribute("placeholder", placeholder);
  if (id) input.setAttribute("id", id);
  input.setAttribute("value", value || "");
  input.addEventListener("keyup", (e) => onchange(e.target.value));
  return input;
}

//firebase config
// Import the functions you need from the SDKs you need
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxkaPJ72GF0QANOxrNVQmRpNA-qtHOR9I",
  authDomain: "embudo-e640c.firebaseapp.com",
  projectId: "embudo-e640c",
  storageBucket: "embudo-e640c.appspot.com",
  messagingSenderId: "1068722723305",
  appId: "1:1068722723305:web:55007859a39db87be89378",
  measurementId: "G-CH96J38YY3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const mailsCollection = db.collection('mails')

//to save data in db
function addSubmit() {
  if (company?.trim() != '' && email?.trim() != '' && employees?.trim() != '') {
    const data = { empresa: company, empleados: employees, email: email }
    mailsCollection.add(data)
      .then((docRef) => {
        console.log('Documento agregado con ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error al agregar el documento: ', error);
      });
  }
}