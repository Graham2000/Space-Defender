document.addEventListener("DOMContentLoaded", () => {
    let deg = 0;
    let id = 1;
    document.addEventListener("keydown", (event) => {
        let cannon = document.getElementById("cannon");
        cannon.style.position = "absolute";

        if (event.key === "w") {
            deg += 15;
            if (deg >= 360) {
                deg = 0;
            }
        } else if (event.key === "s") {
            deg -= 15;
            if (deg <= 0) {
                deg = 360;
            }
        } else if (event.key === " ") {
            // Spawn bullet
            let bullet = document.createElement("div");
            bullet.style.position = "absolute";
            bullet.style.backgroundColor = "red";
            bullet.style.width = "10px";
            bullet.style.height = "10px";
            bullet.style.borderRadius = "50%";
            document.body.appendChild(bullet);
            let shellEnclosure = document.getElementById("shellEnclosure");

            shellEnclosure.appendChild(bullet);

            let pos = 10;
            setInterval( () => {
                let posX = pos + 'px';
                bullet.style.transform = `translate(${posX}, 0)`;
                pos += 10;
            }, 1000);
            id+= 1;
        }
        cannon.style.transform = `rotate(${deg}deg)`;
    });
});