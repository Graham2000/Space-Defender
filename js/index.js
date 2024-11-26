function isOverlapping(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function isElementOffScreen(element) {
    const rect = element.getBoundingClientRect();

    return (
        rect.bottom < 0 ||
        rect.right < 0 ||
        rect.left > window.innerWidth ||
        rect.top > window.innerHeight
    );
}

document.addEventListener("DOMContentLoaded", () => {
    let deg = 0;
    let id = 1;
    let bullets = [];
    document.addEventListener("keydown", (event) => {
        let cannon = document.getElementById("cannon");
        cannon.style.position = "absolute";

        if (event.key === "w") {
            deg += 5;
            if (deg >= 360) {
                deg = 0;
            }
        } else if (event.key === "s") {
            deg -= 5;
            if (deg <= 0) {
                deg = 360;
            }
        } else if (event.key === " ") {
            let bullet = document.createElement("div");
            bullet.style.position = "absolute";
            bullet.style.backgroundColor = "#FF007F";
            bullet.style.width = "10px";
            bullet.style.height = "10px";
            bullet.style.borderRadius = "50%";
            bullet.classList.add("bullets");
            document.getElementById('shellEnclosure').appendChild(bullet);

            let pos = 10;
            let int1 = setInterval( () => {
                let posX = pos + 'px';
                bullet.style.transform = `translate(${posX}, 0)`;
                pos += 10;
            }, 1);

            if (isElementOffScreen(bullet)) {
                clearInterval(int1);
            }

            id+= 1;
        }
        cannon.style.transform = `rotate(${deg}deg)`;
    });

    // TODO: generate enemy craft and random coords
    setInterval( (() => {
        let eCraft = document.createElement("img");
        setTimeout(() => {
            eCraft.style.position = "fixed";
            eCraft.style.left = "0";
            eCraft.style.top = '0';
            eCraft.style.width = "5%";
            eCraft.style.height = "5%";
            eCraft.style.zIndex = '1000';
            eCraft.src = 'C:/Users/graha/Downloads/ufo.png';
            document.body.appendChild(eCraft);

        }, 1000);

        let pos = 0;
        setInterval((() => {
            let posX = pos;
            let posY = pos;
            eCraft.style.transform = `translate(${posX+'px'}, ${posY+'px'})`;
            for (let i = 0; i < document.getElementsByClassName('bullets').length; i++) {
                if (isOverlapping(document.getElementsByClassName('bullets')[i], eCraft)) {
                    document.body.removeChild(eCraft);
                }
            }
            pos += 10;
        }), 300);
    }), 5000);

    // TODO: If eCraft hits station
        // game over

});