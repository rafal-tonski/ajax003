let formCreateUser = document.getElementById("create-user");
let btnGetRandomUser = document.getElementById("get-random-user");

const getUser = () => {
  let msgGet = document.getElementById("msg-get");
  msgGet.innerHTML = "";
  fetch(`https://akademia108.pl/api/ajax/get-random-user.php`, {
    mode: "cors",
    method: "GET",
  })
    .then((res) => res.json())
    .then((resJSON) => {
      console.log(resJSON);
      if (!resJSON.errors) {
        msgGet.innerText = `Name: ${resJSON.firstName} ${resJSON.lastName}. 
        Occupation & company: ${resJSON.occupation} in ${resJSON.company}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

btnGetRandomUser.addEventListener("click", getUser);

const createUser = () => {
  let errors = [];

  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let occupation = document.getElementById("occupation");
  let company = document.getElementById("company");

  let errorsUl = document.getElementById("errors");
  errorsUl.innerHTML = "";
  let pMsg = document.getElementById("msg");
  pMsg.innerHTML = "";

  if (firstName.value.trim() === "") {
    errors.push("Podaj imie");
  }

  if (lastName.value.trim() === "") {
    errors.push("Podaj nazwisko");
  }

  if (occupation.value.trim() === "") {
    errors.push("Podaj zawód");
  }

  if (company.value.trim() === "") {
    errors.push("Podaj firmę");
  }

  if (errors.length > 0) {
    for (const error of errors) {
      let errorLi = document.createElement("li");
      errorLi.innerText = error;
      errorsUl.appendChild(errorLi);
    }

    return false;
  }

  let user = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    occupation: occupation.value.trim(),
    company: company.value.trim(),
  };

  fetch(`https://akademia108.pl/api/ajax/post-user.php`, {
    headers: {
      "Content-Type": "application/json",
    },

    mode: "cors",

    method: "POST",

    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((resJSON) => {
      console.log(resJSON);

      if (!resJSON.errors) {
        formCreateUser.reset();
        pMsg.innerText = resJSON.messages[0];
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

formCreateUser.addEventListener("submit", createUser);
