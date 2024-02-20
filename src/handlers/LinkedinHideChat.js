async function LinkedinHideChat(window) {
    if (window.location.hostname !== "www.linkedin.com")
        return;

    let button = await Fn.waitFor(() => document.querySelector(".msg-overlay-bubble-header__controls"));
    await Fn.sleep(500);
    button.children[2].click();
}