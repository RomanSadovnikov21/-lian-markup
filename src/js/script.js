$(function () {

  // Burger-menu

  $('.burger-menu__btn').on('click', function (e) {
    e.preventDefault();
    $('.burger-menu').toggleClass('burger-menu_active');
    $(this).toggleClass('burger-menu_active');
  });

  // Sliders

  $('#introSlider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: true,
    dots: true
  });

  $('#projectSlider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    swipe: false,
    prevArrow: $('.btn__prev'),
    nextArrow: $('.btn__next'),
  });

  // Contact

  $('.btn__close').click(function () {
    $(".map__address").fadeToggle(100);
  });

  // Blog video

  var video = document.querySelector(".video");
  var btn = document.getElementById("play-pause");

  function togglePlayPause() {
    if (video.paused) {
      btn.className = "pause";
      video.play();
    }
    else {
      btn.className = "play";
      video.pause();
    }
  }

  btn.onclick = function () {
    togglePlayPause();
  };

  var burger = $("#burgerMenu");
  var burgerbtn = $("#burger-btn");

  burgerbtn.on("click", function (event) {
    event.preventDefault();
    burger.toggleClass("show");
  });
});
