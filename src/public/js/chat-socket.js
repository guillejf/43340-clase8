const socket = io();

let nombre = "";

async function asyncWraper() {
  const { value: nombreIngresado } = await Swal.fire({
    title: "Ingresa tu nombre",
    input: "text",
    inputLabel: "Tu nombre",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Por favor completar";
      }
    },
  });
  nombre = nombreIngresado;
  document.getElementById("span-nombre").innerHTML = nombre;
}

asyncWraper();

const chatBox = document.getElementById("input-msg");

chatBox.addEventListener("keyup", ({ key }) => {
  //alert("toco " + key);
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      msg: chatBox.value,
      user: nombre,
    });
    chatBox.value = "";
  }
});

socket.on("todos_los_msgs", (msgs) => {
  //   console.log(msgs);

  const divMsgs = document.getElementById("div-msgs");
  let contenido = "";
  msgs.forEach((msg) => {
    contenido = contenido + `<p>${msg.user} dice: ${msg.msg}</p>`;
  });
  divMsgs.innerHTML = contenido;
  window.scrollTo(0, document.body.scrollHeight);
});

//FRONT ATAJA "msg_server_to_front"
/* socket.on("msg_server_to_front", (msg) => {
  console.log(msg);
});
 */
//FRONT EMITE "msg_front_to_back"
/* socket.emit("msg_front_to_back", {
  author: nombre,
  msg: "hola server!!!",
}); */

/* socket.emit("data_dispositivo", {
  author: nombre,
  so: "windows",
  version: 11,
  browser: "chrome",
}); */

/* setInterval(() => {
  socket.emit("msg_random", {
    author: nombre,
    msg: Math.random(),
  });
}, 1000); */

/* socket.on("msg_a_todos", (msg) => {
  console.log(msg);
}); */
