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
      user = result.value; // update the user variable here
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
    socket.on ('logs', data => {
        const divLog = document.getElementById('messageLogs')
        let messages = ""
        data.reverse().forEach(element => {
            messages +=  `<p> ${element.user}: ${element.message}</p>`
        
        });
        divLog.innerHTML = messages
    })

    socket.on('message', data => {
        const { user, message } = data;
        const chat = new chat({ user, message });
        chat.save((err, savedChat) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Mensaje guardado:', savedChat);
          }
        });
      });