async function LinkedinHideChat(window) {
    if (window.location.hostname !== "www.linkedin.com")
        return;

    try{
        let button = await Fn.waitFor(() => document.getElementById("ember116"));
        await Fn.sleep(500);
        button.click();
    }catch(err){
        console.error(err);
    }
    
}