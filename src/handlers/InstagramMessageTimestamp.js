/**
 * @param {Window} window 
 */
function InstagramMessageTimestamp(window) {
    if (window.location.hostname !== "www.instagram.com")
        return;

    function timeDifference(elapsed) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        if (elapsed < msPerMinute)
            return Math.round(elapsed/1000) + ' seconds ago';
        if (elapsed < msPerHour)
            return Math.round(elapsed/msPerMinute) + ' minutes ago';
        if (elapsed < msPerDay )
                return Math.round(elapsed/msPerHour ) + ' hours ago';
        if (elapsed < msPerMonth)
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
        if (elapsed < msPerYear)
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }

    setInterval(function () {
        for (let message of document.querySelectorAll(".x6prxxf.x1fc57z9.x1yc453h")) {
            if (message.dataset.marked)
                continue;
            element = message.parentElement.parentElement;

            const [_, props] = Object.values(element);
            const messageData = props.children[0].props.message;

            let createdAt = messageData.timestampMs;
            createdAt = createdAt[0] * 4294967296 + createdAt[1];

            const container = element.parentElement;
            let span = container.querySelector("._timestamp");

            const elapsed = Date.now() - createdAt;
            if (elapsed > 1000 * 60 * 60 * 24 && span !== null) {
                element.dataset.marked = true;
                continue;
            }

            if (!span) {
                span = document.createElement("span");
                span.classList.add("_timestamp");
                span.style.alignSelf = "center";
                span.style.fontSize = "12px";
                span.style.opacity = "50%";
                const isFromUser = message.classList.contains("x14ctfv");
                if (isFromUser) {
                    span.style.marginRight = "10px";
                    container.prepend(span);
                } else {
                    span.style.marginLeft = "10px";
                    container.append(span);
                }
            }
            span.innerText = timeDifference(elapsed);
        }
    }, 1100);
}
