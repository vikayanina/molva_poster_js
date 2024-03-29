
//модальные окна
let btns = document.querySelectorAll("*[data-modal-btn]");

for(let i=0; i<btns.length; i++) {
    btns[i].addEventListener('click', function(){
        let name = btns[i].getAttribute('data-modal-btn');
        let modal = document.querySelector("[data-modal-window='"+name+"']");
        modal.style.display = "block"; 
        let close = modal.querySelector(".close_modal_window");
        close.addEventListener('click', function(){
            modal.style.display = "none";
        })
    })
}

//пазл
{
const dragstart = function(event) {
    event.dataTransfer.setData("text", event.target.id);
};
const dragover = function(event) {
event.preventDefault();
}
const drop = function(event) {
    event.preventDefault();
    let imageId = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(imageId));
};

const cells = document.getElementsByClassName("col");
Array.from(cells).forEach((element) => {
    element.addEventListener('dragover', dragover);
    element.addEventListener('drop', drop);
});
const images = document.getElementsByTagName("img");
Array.from(images).forEach((element) => {
    element.addEventListener('dragstart', dragstart);
});
}


//письмо от руки

const config = {
    'lineSize': 5,
    'color': 'black'
}

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const indicator = document.getElementById('indicator');

    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    ctx.lineWidth = config.lineSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = config.color;
    ctx.fillStyle = config.color;

    var isRec = false,
        newDraw = false,
        posX = [],
        posY = []

    canvas.addEventListener("mousedown", (e) => {
        if (isRec) return;
        clearCanvas();
        canvas.onmousemove = (e) => recordMousePos(e);
    });

    canvas.addEventListener("mouseup", () => stopDrawing());

    document.addEventListener("keydown", (e) => {
        if(e.code == "Space") {
            if(!isRec) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                isRec = true;
                switchIndicator(false);
                autoDraw();
            }
        }
    })
    function recordMousePos(e) {
        posX.push(e.clientX);
        posY.push(e.clientY);
        drawLine(e.clientX, e.clientY);
    }
    function drawLine(x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    function clearCanvas() {
        if(newDraw) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            newDraw = false;
            if(sketch != null) {
                sketch.style.visibility = 'visible';
            }
        }
        ctx.beginPath();
    }
    function stopDrawing() {
        canvas.onmousemove = null;
        posX.push(undefined);
        posY.push(undefined);
    }
}


//погоня 

const employee = document.getElementById("employee");
const babushka = document.getElementById("babushka");

document.addEventListener("keydown", function(event){
    jump();
})

function jump() {
    if (employee.classList != "jump"){
        employee.classList.add("jump")
    }
    setTimeout( function() {
     employee.classList.remove("jump")
    }, 300)
}

let isAlive = setInterval ( function(){
    let employeeTop = parseInt(window.getComputedStyle(employee).getPropertyValue("Top"));
    let babushkaLeft = parseInt(window.getComputedStyle(babushka).getPropertyValue("Left"));

    if (babushkaLeft < 50 && babushkaLeft > 0 && employeeTop >= 140) {
        alert("GAME OVER!")
    }
}, 10)