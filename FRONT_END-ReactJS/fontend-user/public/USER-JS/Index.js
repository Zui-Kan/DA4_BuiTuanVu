$(document).ready(function () {
  // trang detail
  $(".topCars").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow:
      '  <button type="button" class="slick-prev pull-left"><img src="/Components/CardCategory/icons8_back_4.svg" alt="#" /></button>',
    nextArrow:
      '<button type="button" class="slick-next pull-right"><img src="/Components/CardCategory/icons8_forward_3.svg" alt="#" /></button>',
  });

  $(".index-abs_toptimkiem").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow:
      '  <button type="button" class="slick-prev pull-left"><img src="/Components/CardCategory/icons8_back_4.svg" alt="#" /></button>',
    nextArrow:
      '<button type="button" class="slick-next pull-right"><img src="/Components/CardCategory/icons8_forward_3.svg" alt="#" /></button>',
  });

  //end trang detail
});
