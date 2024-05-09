$(document).ready(function () {
  $(".category-cards").slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    prevArrow:
      '  <button type="button" class="slick-prev pull-left"><img src="/Components/CardCategory/icons8_back_4.svg" alt="#" /></button>',
    nextArrow:
      '<button type="button" class="slick-next pull-right"><img src="/Components/CardCategory/icons8_forward_3.svg" alt="#" /></button>',
  });

  
});
