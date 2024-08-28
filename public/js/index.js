var socket = io('http://localhost:8000');

          const nam = prompt('Please enter your name: ')

const sendit = document.getElementById('sendit');
const senditinput = document.getElementById('senditinput');
const audio = new Audio('../mixkit-correct-answer-tone-2870.wav')
let video = document.querySelector('.video-frame');
let ownvedio = document.querySelector('#vedio');

let j = document.querySelector('.kl');
let clickit = document.getElementById('clickit');


function append(data, position) {
    let p = document.createElement('div');

    p.innerHTML = data;
    p.classList.add('message');
    p.classList.add(position);
    j.appendChild(p);

};

socket.on('r', data => {
    
    console.log(1);
    append(`${data.p} : ${data.o}`, 'left')
    audio.play();
})
sendit.addEventListener('click', () => {
    append(`you :${senditinput.value}`, 'right')
    socket.emit('send', { message: senditinput.value, nam: nam });
    
    
    senditinput.value = '';
})
senditinput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        append(`you :${senditinput.value}`, 'right')
        socket.emit('send', { message: senditinput.value, nam: nam });
        senditinput.value = '';
    } })
    
    // socket.on('r', data => {
        
    //     append(`${data.p} : ${data.o}`, 'left')
    //     audio.play();
    // })


function appendvideo() {
    let o = document.createElement('video');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(
            (s) => {

                o.srcObject = s;
                o.autoplay = true;
                o.muted = false;
                o.classList.add('vedio');
                video.appendChild(o);

            }
        ).catch(err => {
            console.log(err);
        })
    }
};

clickit.addEventListener('click', () => {
    socket.emit('vedio', nam);
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
            ownvedio.srcObject = s;
            ownvedio.muted = false;
        })
    }
    
    
})

socket.on('ved', nam => {
    appendvideo();
    clickit.removeEventListener('click');
    
})
socket.emit('user-joined', nam);
socket.on('new', nam => {
     console.log(nam);
    append(`${nam} : joined the chat`, 'left');
})

socket.on('old', nam => {

    console.log(nam);
    append(`${nam} : left the chat`, 'left');
})
// const socket = io()
// let name;
// let textarea = document.querySelector('#textarea')
// let messageArea = document.querySelector('.message__area')
// do {
//     name = prompt('Please enter your name: ')
// } while(!name)

// textarea.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//         sendMessage(e.target.value)
//     }
// })

// function sendMessage(message) {
//     let msg = {
//         user: name,
//         message: message.trim()
//     }
//     // Append 
//     appendMessage(msg, 'outgoing')
//     textarea.value = ''
//     scrollToBottom()

//     // Send to server 
//     socket.emit('message', msg)

// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }

// // Recieve messages 
// socket.on('message', (msg) => {
//     appendMessage(msg, 'incoming')
//     scrollToBottom()
// })

// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }






