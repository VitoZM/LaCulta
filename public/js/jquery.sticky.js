//sticky function
$(window).scroll(function () {
  if ($(window).scrollTop() > 51) {
    $("#sticky-wrapper").addClass("is-sticky");
    $("#navbar").addClass("fixed-top");
  } else {
    $("#sticky-wrapper").removeClass("is-sticky");
    $("#navbar").removeClass("fixed-top");
  }
});
