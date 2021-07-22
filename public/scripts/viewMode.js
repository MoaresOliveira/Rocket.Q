const html = document.querySelector("html");
const viewModeButton = document.querySelector("#viewMode");
const logo = document.querySelector("header a img")
if (localStorage.DarkMode == 'true') {
    html.classList.toggle("dark");
    logo.setAttribute("src", "/images/logo-light.svg");
    viewModeButton.checked = true
}

viewModeButton.addEventListener("click", function () {
    html.classList.toggle("dark");    
    if(html.classList == ''){
        logo.setAttribute("src", "/images/logo.svg");
        localStorage.setItem('DarkMode', false)
    }else {
        logo.setAttribute("src", "/images/logo-light.svg");
        localStorage.setItem("DarkMode", true);
    }
});
