jQuery(document).ready(function($) {
  var time = 380;

  // Отложенная инициализация
  setTimeout(function() {
    // Плавный скроллинг для ссылок с классом .smoothscroll
    $(".smoothscroll").on("click", function(e) {
      e.preventDefault();
      var target = this.hash,
          $target = $(target);

      $("html, body")
        .stop()
        .animate({
          scrollTop: $target.offset().top
        }, 800, "swing", function() {
          window.location.hash = target;
        });
    });

    // Обновление высоты хедера при изменении размера окна
    function updateHeaderHeight() {
      $("header").css({ height: $(window).height() });
      $("body").css({ width: $(window).width() });
    }

    updateHeaderHeight();
    $(window).on("resize", updateHeaderHeight);

    // Прокрутка и скрытие/отображение навигации
    $(window).on("scroll", function() {
      var headerHeight = $("header").height();
      var scrollTop = $(window).scrollTop();
      var nav = $("#nav-wrap");

      if (scrollTop > headerHeight * 0.2 && scrollTop < headerHeight && $(window).outerWidth() > 768) {
        nav.fadeOut("fast");
      } else {
        if (scrollTop < headerHeight * 0.2) {
          nav.removeClass("opaque").fadeIn("fast");
        } else {
          nav.addClass("opaque").fadeIn("fast");
        }
      }
    });
  }, time);
});
