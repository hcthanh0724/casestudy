const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 2125
canvas.height = 1050

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
// const background = new Player({
//     position: {
//         x: 0,
//         y: 0
//     },
    // imageSrc: './img/background.png'
// })


const allie = new Fighter({
 position:{
    x: 0,
    y: 0
},
velocity: {
     x: 0,
     y: 0
},
    offset: {
     x : 0,
     y : 0
    }
})



const enemy = new Fighter({
position: {
    x: 800,
    y: 300
    },
velocity: {
    x: 0,
    y: 0
    },
    offset: {
        x: -100,
        y: 0
    },
    color: 'blue'
})



console.log(allie)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

let time = 60
let timeId
function decreaseTimer (){
    if (time > 0) {
       timeId = setTimeout(decreaseTimer,1000)
        time--
    document.querySelector('#timer').innerHTML = time
    }
    if (allie.health === enemy.health && time === 0) {
        document.querySelector('#displayText').innerHTML = 'Tie'
        document.querySelector('#displayText').style.display = 'flex'
    }
    else if (allie.health > enemy.health && time === 0){
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'
        document.querySelector('#displayText').style.display = 'flex'
    }
    else if (enemy.health > allie.health && time === 0){
        document.querySelector('#displayText').innerHTML = 'Player 2 wins'
        document.querySelector('#displayText').style.display = 'flex'
    }
    else if (allie.health <= 0) {
        document.querySelector('#displayText').innerHTML = 'Player 2 wins'
        document.querySelector('#displayText').style.display = 'flex'
        clearTimeout(timeId)
    }
    else if (enemy.health <= 0 ){
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'
        document.querySelector('#displayText').style.display = 'flex'
        clearTimeout(timeId)
    }

}
decreaseTimer()

function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    // background.update()
    allie.update()
    enemy.update()
    allie.velocity.x = 0
    enemy.velocity.x = 0


    //player movement
    if (keys.a.pressed && allie.Lastkey ==='a'){
        allie.velocity.x = -5
    }
    else if (keys.d.pressed && allie.Lastkey === 'd'){
        allie.velocity.x = 5
    }
    else if (keys.w.pressed && allie.Lastkey === 'w'){
        allie.velocity.y = -10
    }

    //enemy movement
    if (keys.ArrowRight.pressed && enemy.Lastkey ==='ArrowRight'){
        enemy.velocity.x = 5
    }
    else if (keys.ArrowLeft.pressed && enemy.Lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }
    else if (keys.ArrowUp.pressed && enemy.Lastkey === 'ArrowUp'){
        enemy.velocity.y = -10
    }

    //detect for collision
    if(rectangularCollision({
        rectangle1: allie,
        rectangle2: enemy
        })
        && allie.attacking)
    {
        allie.attacking = false
        enemy.health -= 5
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }
    if(rectangularCollision({
            rectangle1: enemy,
            rectangle2: allie
        })
        && enemy.attacking)
    {
        enemy.attacking = false
        allie.health -= 5
        document.querySelector('#allieHealth').style.width = allie.health + '%'
    }
}



animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key){
        case 'd' :
            keys.d.pressed = true
            allie.Lastkey = 'd'
            break
        case 'a' :
            keys.a.pressed = true
            allie.Lastkey = 'a'
            break
        case 'w' :
            keys.w.pressed = true
            allie.Lastkey = 'w'
            break
        case  ' ' :
            allie.attack()
            break

        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            enemy.Lastkey = 'ArrowRight'
            break

        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            enemy.Lastkey = 'ArrowLeft'
            break

        case 'ArrowUp' :
            keys.ArrowUp.pressed = true
            enemy.Lastkey = 'ArrowUp'
            break

        case 'ArrowDown' :
            enemy.attacking = true
            break

    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd' :
            keys.d.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            break
        case 'w' :
            keys.w.pressed = false
            break
    }
    switch (event.key){
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp' :
            keys.ArrowUp.pressed = false
            break
    }
    console.log(event.key)
})
