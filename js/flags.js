document.addEventListener("DOMContentLoaded", () => {

    const flags = [
        "mx","us","ca","ar","br","fr","de","es","it","pt",
        "nl","jp","kr","uy","ma","hr","be","ch","pl"
    ];

    function createFlagBar() {
        const bar = document.createElement("div");
        bar.className = "flag-bar";

        const track = document.createElement("div");
        track.className = "flag-track";

        // Duplicamos para efecto infinito
        for (let i = 0; i < 4; i++) {
            flags.forEach(code => {
                const img = document.createElement("img");
                img.src = `https://flagcdn.com/w40/${code}.png`;
                img.alt = code;
                track.appendChild(img);
            });
        }

        bar.appendChild(track);
        return bar;
    }

    // BARRA SUPERIOR
    const topBar = createFlagBar();
    document.body.prepend(topBar);

    // BARRA INFERIOR → dentro del footer
    const footer = document.querySelector("footer");

    if (footer) {
        const bottomBar = createFlagBar();
        footer.appendChild(bottomBar);
    }

});