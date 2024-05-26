 var slideIndex = 1;
// showSlides(slideIndex);

export function plusSlides(n:any) {
    showSlides(slideIndex += n);
}

export function currentSlide(n:any) {
    showSlides(slideIndex = n);
}

export function showSlides(n:any) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        (slides[i] as HTMLElement).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    (slides[slideIndex - 1] as HTMLElement).style.display = "block";
    dots[slideIndex - 1].className += " active";
    // (captionText as HTMLElement).innerHTML = (dots[slideIndex - 1] as HTMLElement).alt;
}