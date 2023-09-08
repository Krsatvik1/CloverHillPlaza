if (window.innerWidth > 768) {
  const screenHeight = window.screen.availHeight;
  const element = document.getElementById("header");
  const desiredHeight = screenHeight - 148;

  element.style.height = desiredHeight + "px";
} else {
  const screenHeight = window.screen.availHeight;
  const element = document.getElementById("header");
  const desiredHeight = screenHeight - 148;

  element.style.height = desiredHeight + "px";
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const screenHeight = window.screen.availHeight;
    const element = document.getElementById("header");
    const desiredHeight = screenHeight - 148;

    element.style.height = desiredHeight + "px";
  } else {
    const screenHeight = window.screen.availHeight;
    const element = document.getElementById("header");
    const desiredHeight = screenHeight - 148;

    element.style.height = desiredHeight + "px";
  }
});

//On and off state management for faq section. Toggle off all the other faq sections when one is clicked.

const faq = document.querySelectorAll(".faq");

faq.forEach((items) => {
  items.querySelector(".button").addEventListener("click", () => {
    if (!items.querySelector(".para").classList.contains("active")) {
    faq.forEach((item) => {
      item.querySelector(".para").classList.remove("active");
      item.querySelector(".button").classList.remove("active");
    });
      items.querySelector(".para").classList.add("active");
      items.querySelector(".button").classList.add("active");
    }else{
      items.querySelector(".para").classList.remove("active");
      items.querySelector(".button").classList.remove("active");
    }
  });
});


const clicker = document.querySelector("#clicker");
const sideNav = document.querySelector("#sidenav");

clicker.addEventListener("click", () => {
  sideNav.classList.toggle("side-active");
  clicker.classList.toggle("clicker-active");
});

const form = document.querySelector("#form");

const url = `https://api.hsforms.com/submissions/v3/integration/submit/${43795697}/${'81ab7dd7-45f5-47c7-a539-04fa38c18a3a'}`;
function handleFormSubmit(event) {
  let name = document.querySelector('input[name="name_client"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let phone = document.querySelector('input[name="mobile"]').value;
  let message = document.querySelector('textarea[name="message"]').value;
  event.preventDefault();
  let data = {
    "fields": [
      {
        "name": "name_client",
        "value": name
      },
      {
        "name": "phone",
        "value": phone
      },
      {
        "name": "email",
        "value": email
      },
      {
        "name": "message",
        "value": message
      },
      //...add more fields as necessary
    ],
  };
  console.log(data);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    if(response.ok) {
      console.log('Form submission successful');
      document.querySelector('#thankyou').classList.remove('hidden');
      document.querySelector('#thankyou').classList.add('flex');
      document.querySelector('#thankyou').style.opacity = 1;
    } else {
      console.log('Form submission failed');
      console.log(response.text());
    }
  }).catch(error => {
    console.error('Error:', error);
  });
}
form.addEventListener("submit", handleFormSubmit);