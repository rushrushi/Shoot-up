let bullet = document.querySelector("#bullet")
let obj = document.querySelector("#target")
let btn = document.querySelector("#trigger_btn")

let bullet_pos = { x: 0, y: 0, right: 0, bottom: 0 };
let obj_pos = { x: 0, y: 0, right: 0, bottom: 0 };

let score = document.querySelector("#score")
let score_value = score.textContent
let score_update = parseInt(score_value, 10)

bullet.style.opacity = 0
let sound_btn = document.querySelector("#sound")
let bgm = document.querySelector("#bgm")
bgm.volume = 0.6

bgm.play()

let flag = 1

gsap.from("#target", {
    duration: 1,
    top: 400,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
    onUpdate: () => {
        obj_pos = obj.getBoundingClientRect();

    }
})


btn.addEventListener("click", function () {
    document.querySelector("#shoot_sound").play()
})

sound_btn.addEventListener("click", function () {
    if (flag == 1) {
        flag = 0
        bgm.pause()
        sound_btn.innerHTML = `<img src="assets/sound_off.png" />`
    } else {
        flag = 1
        bgm.play()
        sound_btn.innerHTML = `<img src="assets/sound_on.png" />`
    }
})

btn.addEventListener("click", function () {

    gsap.to("#bullet", {
        opacity: 1,
        duration: 0.5,
        x: 1300,
        repeat: 1,
        yoyo: true,
        ease: "power1.inOut",
        onUpdate: () => {
            bullet_pos = bullet.getBoundingClientRect();
        }
    })
    // gsap.to("#bullet", {
    //     opacity: 0,
    //     delay: 1,
    //     x: 0,
    //     ease: "power1.inOut",
    //     onUpdate: () => {
    //         bullet_pos = bullet.getBoundingClientRect();
    //     }
    // })
    gsap.from("#gun", {
        duration: 0.8,
        x: -8,
        y: 4
    })

})

function isColliding(bullet_pos, obj_pos) {
    return (
        (bullet_pos.right >= obj_pos.x) && (bullet_pos.right <= obj_pos.right)
        && (bullet_pos.y >= obj_pos.y) && (bullet_pos.y <= obj_pos.bottom)
    );
}

setInterval(() => {
    
    if (isColliding(bullet_pos, obj_pos)) {
        document.querySelector("#target_hit").play()

        score_update += 1
        score.innerHTML = score_update

        obj.style.backgroundColor = "red"
        obj.style.boxShadow = "10px 60px 80px rgb(62, 10, 19)"

        gsap.from("#target", {
            scale: 0,
            duration: 0.8
        })

    } else {
        obj.style.backgroundColor = "blue"
        obj.style.boxShadow = "10px 60px 80px rgb(10, 10, 62)"
    }

}, 100);


setInterval(() => {

    if (score_update >= 5){
        gsap.to("#target", {
            scale: 0.7,
        })
    }

}, 500);

