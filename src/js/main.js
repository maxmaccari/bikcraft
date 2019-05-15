$(function() {
  $('.js-slides-customers').responsiveSlides({
    auto: true,             // Boolean: Animate automatically, true or false
    speed: 500,            // Integer: Speed of the transition, in milliseconds
    timeout: 5000,          // Integer: Time between slide transitions, in milliseconds
  });

  $('.js-slides-portfolio').responsiveSlides({
    auto: true,             // Boolean: Animate automatically, true or false
    speed: 500,            // Integer: Speed of the transition, in milliseconds
    timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
    pager: true,           // Boolean: Show pager, true or false
  });
});

Visibility.onVisible(function () {
  window.setTimeout(function () {
    $('.js-animate--first').addClass('animated animated--fadeInDown');
  }, 400);
  window.setTimeout(function () {
    $('.js-animate--second').addClass('animated animated--fadeInDown');
  }, 800);
  window.setTimeout(function () {
    $('.js-animate--third').addClass('animated animated--fadeInDown');
  }, 1200);
  window.setTimeout(function () {
    $('.js--animate-fourth').addClass('animated animated--fadeInDown');
  }, 1600);
});
