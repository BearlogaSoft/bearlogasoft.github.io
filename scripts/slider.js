
//Индефецируем страницу
var pageId = document.getElementById('page-id').innerHTML;
//Получаем информацию о необходимых для данной страницы картинок
var imgName = pageId[0];
var imgCount = pageId[pageId.length - 1];

//Создаем массив для хранения ссылок на эти картинки
var imgs = [];

//Заполняем массив ссылками
for (i = 1; i <= imgCount; i++) {
  imgs.push("../img/projectImg/" + imgName + i + ".webp");
}

current = imgCount - 1;

closedWidth = Math.floor(document.getElementById('slider').offsetWidth / 8)

var w = document.getElementById('slider').offsetWidth;
var h = document.getElementById('slider').offsetHeight;


for (var i = 0; i < imgCount; i++) {

  var bgImg = document.createElement('div');
  sliderBG.appendChild(bgImg);

  gsap.set(sliderBG, {
    width: w,
    height: h
  })
  gsap.set(sliderFG, {
    width: w,
    height: h
  })

  gsap.set(bgImg, {
    attr: { id: 'bgImg' + i, class: 'bgImg' },
    width: '100%',
    height: '100%',
    backgroundImage: 'url(' + imgs[i] + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition:'center'
  })

  var b = document.createElement('div');
  sliderFG.appendChild(b);

  gsap.fromTo(b, {
    attr: { id: 'b' + i, class: 'box' },
    width: '100%',
    height: '100%',
    borderLeft: (i > 0) ? 'solid 2px #000' : '',
    backgroundColor: 'rgba(250,250,250,0)',
    left: i * closedWidth,
    transformOrigin: '100% 100%',
    x: '100%'
  }, {
    duration: i * 0.15,
    x: 0,
    ease: 'expo.inOut'
  })

  b.onmouseenter = b.onclick = (e) => {
    if (Number(e.currentTarget.id.substr(1)) == current) return;

    var staggerOrder = !!(current < Number(e.currentTarget.id.substr(1)));
    current = Number(e.currentTarget.id.substr(1));
    gsap.to('.box', {
      duration: 0.5,
      ease: 'elastic.out(0.3)',
      left: (i) => (i <= current) ? i * closedWidth : document.getElementById('slider').offsetWidth - ((imgCount - i) * closedWidth),
      x: 0,
      stagger: staggerOrder ? 0.05 : -0.05
    })

    sliderBG.appendChild(document.getElementById('bgImg' + current))
    gsap.fromTo('#bgImg' + current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.inOut' })
    gsap.fromTo('#bgImg' + current, { scale: 1, rotation: 0.05 }, { scale: 1, rotation: 0, duration: 1.5, ease: 'sine' })
  }
}


window.onresize = (e) => {
  closedWidth = Math.floor(document.getElementById('slider').offsetWidth / 8)
  w = document.getElementById('slider').offsetWidth;
  h = document.getElementById('slider').offsetHeight;
  gsap.set(sliderBG, {
    width: w,
    height: h
  })
  gsap.set(sliderFG, {
    width: w,
    height: h
  })
  gsap.set('.box', { x: 0, left: (i) => (i <= current) ? i * closedWidth : document.getElementById('slider').offsetWidth - ((imgCount - i) * closedWidth) })
}