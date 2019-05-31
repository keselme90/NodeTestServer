const loader = document.querySelector('.loader')
const loader_text = document.querySelector('.loader_text')
const main = document.querySelector('.main')


function init(){

    setTimeout(() => {
            loader.style.opacity = 0
            loader.style.display = 'none'
            
            loader_text.style.opacity = 0
            loader_text.style.display = 'none'

            main.style.display = 'block'
            setTimeout(() =>  main.style.opacity = 1, 50)
           
    }, 5000);
}

init();