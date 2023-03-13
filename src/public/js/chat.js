const socket = io();
let user = ''
let chatbox = document.getElementById('chatbox')

swal.fire({
    title:"Authentication",
    input:"text",
    text:"Ingrese su email",
    inputValidator: (value) => {
        if (!value.trim() || !(/^\S+@\S+\.\S+$/.test(value.trim()))) {
          return 'Por favor ingrese un mail valido!';
        }
      },
      allowOutsideClick: false,
    }).then((result) => {
      const user = result.value;
      document.getElementById("mail").innerHTML = user
      // socket.emit('new-user', user)
    });


    chatbox.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            if(chatbox.value.trim().length > 0){
                socket.emit('message',{
                user,
                message: chatbox.value
                })
                chatbox.value = ""
            }
        }      
    })