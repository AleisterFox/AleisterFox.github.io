
window.addEventListener('scroll', function(){
    let arrowUp = document.querySelector('.arrow-up');
    let inicio = document.querySelector('.header');
    let position = inicio.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    if (position != 0) {
        arrowUp.classList.remove('hide');
    } else {
        arrowUp.classList.add('hide');
    }
});