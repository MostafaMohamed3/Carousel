const track = document.querySelector('.track');
const card = document.querySelector('.card');
const cards = document.querySelectorAll('.card');
const numOfSlide = Math.floor(cards.length / 3) - 1;
const decimalOfSlide = (cards.length / 3) - Math.floor(cards.length / 3);
let endOfCarousel = track.clientWidth * numOfSlide;
if (decimalOfSlide > 0.5 && decimalOfSlide != 0){
    endOfCarousel = endOfCarousel + (card.clientWidth * 2);
}else if (decimalOfSlide < 0.5 && decimalOfSlide != 0){
    endOfCarousel = endOfCarousel + card.clientWidth;
};
let initialPosition = null;
let moving = false;
let transform = 0;
// when mouse down
const gestrueStart = (e) => {
    initialPosition = e.pageX;
    moving = true;
    const transformMatrix =window.getComputedStyle(track).getPropertyValue('transform');
    if(transformMatrix !== 'none'){
        transform = parseInt(transformMatrix.split(',')[4].trim());
    };
};
// when mouse move
const gestrueMove = (e) => {
    if(moving){
        const currentPosition = e.pageX;
        const diff = currentPosition - initialPosition;
        if ((transform + diff) > 5) {
            track.style.transform = `translateX(5px)`;
        }else if((transform + diff) < -endOfCarousel){
            track.style.transform = `translateX(-${endOfCarousel}px)`;
        }else{
            track.style.transform = `translateX(${transform + diff}px)`;
        };
    };
};
// when mouse up
const gestrueEnd = () => {
    moving = false;
};

if(window.PointerEvent){
    window.addEventListener('pointerdown' , gestrueStart);

    window.addEventListener('pointermove' , gestrueMove);

    window.addEventListener('pointerup' , gestrueEnd);
}else{
    window.addEventListener('touchdown' , gestrueStart);

    window.addEventListener('touchmove' , gestrueMove);

    window.addEventListener('touchup' , gestrueEnd);

    window.addEventListener('mousedown' , gestrueStart);

    window.addEventListener('mousemove' , gestrueMove);

    window.addEventListener('mouseup' , gestrueEnd);
};
