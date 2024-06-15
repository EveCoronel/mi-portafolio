const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const formData = new FormData(this);
  const data = {
    from: {
      email: "portafolio.ec@trial-vywj2lp79r1l7oqz.mlsender.net",
    },
    to: [
      {
        email: "ec.business.ia@gmail.com",
      },
    ],
    subject: "Nuevo contacto de protafolio",
    text: formData.get("message"),
    html: `<html><body><p><strong>Nombre:</strong> ${formData.get(
      "name"
    )}</p><p><strong>Teléfono:</strong> ${formData.get(
      "phone"
    )}</p><p><strong>Correo Electrónico:</strong> ${formData.get(
      "email"
    )}</p><p><strong>Mensaje:</strong></p><p>${formData.get(
      "message"
    )}</p></body></html>`,
  };

  fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization:
        "Bearer mlsn.4e26802135e1467df30e01c90f6743e84c91dab2530b07c71262d65cab2f6cc8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Correo enviado con éxito");
        form.reset();
        alert("Hemos recibido tu consulta. Te contactaremos pronto.");
      } else {
        console.error("Error al enviar el correo");
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    });
});
