(function ($) {
  $(document).ready(function () {

    // HEADER-BURGER ========================================================================================================================================================

    $('.header__burger').on('click', function () {

      if ($(this).hasClass('active')) {
        $(this).toggleClass("active");
        $('body').css('overflow', 'auto');
        $('header').addClass('header_mobile');
        $('.container__header-menu').removeClass('open')
      } else {
        $('header').removeClass('header_mobile')
        $(this).toggleClass("active");
        $('body').css('overflow', 'hidden');
        $('.container__header-menu').addClass('open')
      }

    });

    //SUB-MENU =======================================================================================
    $(".menu-item-has-children").click(function () {
      if (window.matchMedia('(max-width: 1279px)').matches) {
        $(".sub-menu").not($(this).find(".sub-menu")).removeClass("open");
        $(this).find(".sub-menu").toggleClass("open");

        $(".menu-item-has-children").not($(this)).removeClass('open');
        $(this).toggleClass('open');

      }
    });

    // HEADER-SCROLL ========================================================================================================================================================

    let scrollChange = 5;

    function headerScroll(params) {

      let scroll = $(window).scrollTop();

      if (scroll >= scrollChange) {
        $('.header').addClass('header_scroll');
      } else {
        $('.header').removeClass('header_scroll');
      }
    }

    $(document).on('scroll', () => {
      headerScroll();
    })

    headerScroll();

    // LANGUAGE BUTTONS =============================================================================

    $('.lang-link').click(function () {

      $('.lang-link').removeClass('active');

      $(this).addClass('active');

    });

    //FAQ ===============================================================================
    
    $('.accordion-header').click(function () {

      $(this).toggleClass('active').next('.accordion-content').slideToggle();

      $('.accordion-header').not(this).removeClass('active').next('.accordion-content').slideUp();
    });

    //APPEND SOC ICON ON MOBILE==========================================================
   
    function appendSocIcon() {
      if (window.matchMedia("(min-width: 576px)").matches) {
        $('.header__soc-icon').insertAfter('.header__language')
      } else {
        $('.header__soc-icon').appendTo('.header-menu__wrapper')
      }
    }

    appendSocIcon();

    $(window).on('resize', () => {
      appendSocIcon();
    });

    //ANIMATION h1 HERO SECTION ============================================================
    gsap.registerPlugin(ScrollTrigger);

    const text = document.querySelectorAll('.text');

    text.forEach(elem => {

      const splitText = (el) => {
        el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
          return `<span class="word">` +
            m.replace(/(-|#|@)?\S(-|#|@)?/g, "<span class='letter'>$&</span>") +
            `</span>`;
        });
        return el;
      };

      const split = splitText(elem);

    });

    gsap.from('h1.hero__title span.letter', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.06,
    });

    // Animation blocks FAQ ========================================================
    let observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          let tl = new TimelineMax();
          tl.fromTo(entry.target, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: Power2.easeInOut, delay: index * 0.2 });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 }); 

    let items = document.querySelectorAll('.accordion-item');

    items.forEach(function(item) {
      observer.observe(item);
    });



  });
})(jQuery);