// Squishia Website Script

// Wait until the page loads
window.addEventListener("load", () => {

    const iframe = document.querySelector("iframe");
    const loader = document.querySelector(".lds-ripple");
    const fullscreenButton = document.querySelector("#fullscreen");


    // Hide loading animation when game loads
    if (iframe) {
        iframe.addEventListener("load", () => {
            if (loader) {
                loader.style.display = "none";
            }
        });
    }


    // Fullscreen button
    if (fullscreenButton && iframe) {

        fullscreenButton.addEventListener("click", () => {

            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            }

        });

    }


    // Detect embed mode
    const params = new URLSearchParams(window.location.search);

    const embed = params.get("embed");
    const noFooter = params.get("nofooter");


    const root = document.querySelector("#root");
    const footer = document.querySelector("#footer");


    if (noFooter === "1") {

        if (root) {
            root.classList.add("nofooter");
        }

        if (footer) {
            footer.remove();
        }

    }


    if (embed === "1") {

        if (root) {
            root.classList.add("embed");
        }

    }

});
