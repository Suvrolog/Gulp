$('.multiple-items').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows:true,
    dots:false,
    appendArrows:'.gallary__slider',
    nextArrow:'<div class="gallary__slider--left"></div>',
    prevArrow:'<div class="gallary__slider--right"></div>',
    responsive:[
      {
        breakpoint: 1080,
        settings: {
            slidesToShow:3,
            slidesToScroll: 3
        }
      },
      {
          breakpoint: 768,
          settings: {
              slidesToShow:2,
              slidesToScroll: 2
          }
      },
      {
          breakpoint: 550,
          settings: {
              slidesToShow:1,
              slidesToScroll: 1
          }
      }
      ]
});

$('.autoplay').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows:true,
  dots:false,

  appendArrows:'.header__slider',
  nextArrow:'<div class="header__slider--right"></div>',
  prevArrow:''
});

$('.single-item').slick({
  infinite: true,
  arrows:true,
  dots:false,
  appendArrows:'.testimonials__slider',
  nextArrow:'<div class="testimonials__slider--right"></div>',
  prevArrow:'<div class="testimonials__slider--left"></div>'
});

$(function() {
    $(".gallary__filter").on('click', function() {
      var filter = $(this).data('filter');
      let tabs = $('.gallary__filter');

      tabs.each(function () {
        $(this).removeClass('gallary__filter--active');
      });
      $(this).addClass('gallary__filter--active');

      $(".multiple-items").slick('slickUnfilter');
      
      if (filter == 'male') {
        $(".multiple-items").slick('slickFilter','.male');
      }
      else if (filter == 'female') {
        $(".multiple-items").slick('slickFilter','.female');
      }
      else if (filter == 'kids') {
        $(".multiple-items").slick('slickFilter','.kids');
      }
      else if (filter == 'all') {
        $(".multiple-items").slick('slickUnfilter');
      }
    });
});
