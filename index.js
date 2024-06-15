// import Swal from "sweetalert2";

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

  fetch("http://localhost:3000/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Correo enviado con éxito");
        form.reset();
        Swal.fire({
          title: "¡Éxito!",
          text: "Gracias por contactarme, te daré una respuesta a la brevedad!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        console.error("Error al enviar el correo");
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar tu consulta. Te agradezco si me contactas a través de Linkedin!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar tu consulta. Te agradezco si me contactas a través de Linkedin!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
});
