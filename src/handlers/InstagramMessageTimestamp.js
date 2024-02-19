/**
 * @param {Window} window 
 */
function InstagramMessageTimestamp(window) {
    if (window.location.hostname !== "www.instagram.com")
        return;

    console.log("Rodando no instagram");

    let id = setInterval(function () {
        clearInterval(id);
        console.log("second");
        for (let element of document.querySelectorAll(".x6prxxf.x1fc57z9.x1yc453h")) {
            element.innerHTML = `marcado: ${element.innerHTML}`;
            element = element.parentElement.parentElement;
            const [_, props] = Object.values(element);
            const message = props.children[0].props.message;
            console.log(message);
            // message.innerHTML = `MARCADO: ${message.innerHTML}`;
            break;
        }
    }, 10000);
    console.log("id", id);
}
