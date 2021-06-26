const html = document.querySelector("html");
const viewModeButton = document.querySelector("#viewMode");
const logo = document.querySelector("header a img")

viewModeButton.addEventListener("click", function () {
    html.classList.toggle("dark");
    if(html.classList == ''){
        logo.setAttribute("src", "/images/logo.svg");
        viewModeButton.innerHTML = '<i class="far fa-moon"></i>';
    }else {        
        logo.setAttribute("src", "/images/logo-light.svg");
        viewModeButton.innerHTML = '<i class="far fa-sun"></i>';        
    }
});
