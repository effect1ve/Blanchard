// Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.758468, 37.601088],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14,
            controls: [],
        });
        
        var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
          iconLayout: 'default#image',
          iconImageHref: 'img/Subtract.svg',
          iconImageSize: [20, 20],
        });

          // Размещение геообъекта на карте.
        myMap.geoObjects.add(myPlacemark); 
                    //отключаем зум колёсиком мышки
        myMap.behaviors.disable('scrollZoom');
        
        myMap.controls.add('geolocationControl', {
            position: {
                right: '0',
                top: '200px',  
                // ???
            }
        })

            myMap.controls.add('zoomControl', {
                size: 'small',
                float: 'none',
                position: {
                    top: '240px',
                    // ???
                    right: '0'
            }
        })

//         // Удалим с карты «Ползунок масштаба».
// myMap.controls.remove('zoomControl');
    }
    