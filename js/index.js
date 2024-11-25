document.addEventListener("DOMContentLoaded", () => {
    let deg = 0;
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
        }
        cannon.style.transform = `rotate(${deg}deg)`;
    });
});