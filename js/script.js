document.addEventListener('DOMContentLoaded', function() {

  const swiperHero = new Swiper('.swiper-hero', {
  //параметры
  allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
      delay: 10000
    }
  });

// hero__neck dropdown

document.querySelectorAll(".dropdown__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
  /* чтобы изначально ползунок был виден */
  autoHide: false,
  /* с помощью этого значения вы можете управлять высотой ползунка*/
  scrollbarMaxSize: 25,
});
})

const btns = document.querySelectorAll(".menu__btn");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function() {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns);
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  })
})

const dropFocus = document.querySelectorAll('.simplebar-content-wrapper');
for(let i = 0;i < dropFocus.length; i++) {
  dropFocus[i].setAttribute('tabindex', '-1');
}

document.body.addEventListener('click',function(event) {
  if(!event.target.closest('.menu__item')) {
    btns.forEach(el => {
      el.classList.remove(activeClassbtns)
    });
    dropdowns.forEach(el => {
      el.classList.remove(activeClassdropdowns)
    })
  }
})


// gallery 


const gallerySwiper = new Swiper('.swiper-gallery', {
  slidesPerView: 3,
  spaceBetween: 44,
  slidesPerGroup: 3,
  loop: false,
  // loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".gallery__next",
    prevEl: ".gallery__prev",
  },
})

const gallerySelector = document.querySelector("#gallery__choices")  

const galleryChoices = new Choices(gallerySelector, {
      searchEnabled: false,
      itemSelectText: '',
      removeItems: false,
      classNames: {
        containerOuter: 'choices gallery__choices',
       },
  });

const btnsGall = document.querySelectorAll('.gallery__btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const modalClose = document.querySelectorAll('.modal-close');

btnsGall.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
    document.body.style.overflow = 'hidden';
  });
});

modalOverlay.addEventListener('click', (e) => {

  if (e.target == modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
      document.body.style.overflow = '';
    });
  }
});

modalClose.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    modals.forEach((el) => {
      document.body.style.overflow = '';
      modalOverlay.classList.remove('modal-overlay--visible');
      el.classList.remove('modal--visible');
    })
  })
})




// accordion


     $( function() {
    $( "#accordion" ).accordion({
      collapsible:true,
      heightStyle: "content",
    });
  } );

  const tabsBtn = document.querySelectorAll('.accordion__content-tab');
  const tabsItem = document.querySelectorAll('.catalogue__people');

  tabsBtn.forEach(tabOnClick);

  function tabOnClick (item) {
      
    tabsBtn.forEach(function(item) {
      item.addEventListener('click', function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);

        if (! currentBtn.classList.contains('active')) {
          tabsBtn.forEach(function(item) {
            item.classList.remove('active')
          });

          tabsItem.forEach(function(item) {
            item.classList.remove('active')
          });

          currentBtn.classList.add('active');
          currentTab.classList.add('active');
        };
      });
    });
  };

// events-swiper

  const swiperEvents = new Swiper(".swiper-events", {
    slidesPerView: 'auto',
    slidesPerView: 3,
    spaceBetween: 50,
    loop: false,
    navigation: {
      prevEl: '.events__swiper-prev',
      nextEl: '.events__swiper-next',
    },
  })


  // projects-swiper

  const swiperProjects = new Swiper('.swiper-projects', {
    // slidesPerView: 'auto',
    slidesPerView: 3,
    spaceBetween: 50,
    loop: false,
    navigation: {
      nextEl: ".projects__btn-next",
      prevEl: ".projects__btn-prev",
    },
  })


  // form

  const form = document.querySelector('#form');
  const telSelector = form.querySelector('input[type="tel"]');
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  inputMask.mask(telSelector);

 const validation = new JustValidate(
  '#form',
  {
    errorLabelStyle: {
      color: '#d11616',
    },

  },
);

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите ваше имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Введите более 2-х символов',
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Введите не более 15-ти символов'
    },
    {
      rule: 'customRegexp',
      value: /^[а-яА-ЯёЁa-zA-Z]+$/,
      errorMessage: 'Неверный формат',
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш телефон',
    },
     {
      rule: 'function',
      validator: function() {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },
    
  ]).onSuccess((event) => {

    let formData = new FormData(event.target);
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
         let doneMessage = document.querySelector('.feedback__message');
         console.log('message is send')
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
  });


});


