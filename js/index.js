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

            // Animate stock
            let stock = document.getElementById('top');
            stock.style.transform = 'translate(10px,0px)'
            setTimeout((() => {
                stock.style.transform = 'translate(0px,0px)'
            }),100);

            if (isElementOffScreen(bullet)) {
                clearInterval(int1);
            }

            id+= 1;
        }
        cannon.style.transform = `rotate(${deg}deg)`;
    });
    let notified = false;

    setInterval((() => {
        let eCraft = document.createElement("img");
        eCraft.style.position = "fixed";
        eCraft.style.top= "0";
        eCraft.style.left = '0';
        eCraft.style.width = "5%";
        eCraft.style.height = "5%";
        eCraft.style.zIndex = '50000';
        eCraft.src = 'img/ufo.png';

        eCraft.className = 'eCrafts';
        document.body.appendChild(eCraft);

        setInterval((() => {

            let ec = document.getElementsByClassName('eCrafts');
            for(let i = 0; i < ec.length; i++) {
                // get current coords
                let currX = ec[i].getBoundingClientRect().x;
                let currY = ec[i].getBoundingClientRect().y;
                // and increment
                xPos = currX + 3.5;
                yPos = currY + 2;
                ec[i].style.transform = "translate("+xPos+"px,"+yPos+"px)";

                for (let i = 0; i < document.getElementsByClassName('bullets').length; i++) {
                    if (isOverlapping(document.getElementsByClassName('bullets')[i], eCraft)) {
                        document.body.removeChild(eCraft);
                    }
                }

                if (isOverlapping(ec[i], document.getElementById('station'))) {
                    if (!notified) {
                        alert('GAME OVER');
                    }
                    notified = true;
                    window.location='newGame.html';
                }
            }

        }), 300);

    }), 5000)
});
