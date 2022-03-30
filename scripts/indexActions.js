

//Установка номера возвращения на страницу
var visitNumber = 1;
var flagClick = false;
var flagBIPAgain = false;
let scrolScript = document.createElement('script');
scrolScript.src = "./scripts/scrol.js";

if (sessionStorage.bearMessage) {
  visitNumber = Number(sessionStorage.bearMessage);
}

document.addEventListener("DOMContentLoaded", () => {
  switch (visitNumber) {
    case 2:
      $("#choice-next").addClass("hide");
      $("#text").removeClass("hide");
      $("#go-next").removeClass("hide");
      document.head.append(scrolScript);
      flagBIPAgain = true;
      break;
    case 3:
      $("#choice-next-BIP").addClass("hide");
      $("#choice-next-none").addClass("hide");
      $("#choice-next-BIP-again").removeClass("hide");
      $("#go-next").removeClass("hide");
      document.head.append(scrolScript);
      break;
    case 4:
    case 5:
      $("#choice-next").addClass("hide");
      $("#text").removeClass("hide");
      $("#go-next").removeClass("hide");
      document.head.append(scrolScript);
      if (visitNumber == 4) flagClick = true;
      break;
    default:
      $("#prompt-text").addClass("hide");
  }
});

$(document).ready(function () {

  $("#choice-next-BIP").on("click", function (event) {
    $("#choice-next").addClass("hide");
    $("#text").removeClass("hide");
    $("#prompt-text").removeClass("hide");
    $("#go-next").removeClass("hide");
    document.head.append(scrolScript);
    flagClick = true;
  });

  $("#choice-next-none").on("click", function (event) {
    $("#choice-next").addClass("hide");
    $("#go-next").removeClass("hide");
    $("#prompt-text").removeClass("hide");
    document.head.append(scrolScript);
    flagBIPAgain = true;
  });

  $("#choice-next-BIP-again").on("click", function (event) {
    $("#choice-next").addClass("hide");
    $("#text").removeClass("hide");
    flagClick = true;
  });

  switch (visitNumber) {
    case 1:
      textMsg = [
        "Здравствуйте!",
        "Это офис маленькой студии BearlogaSoft.",
        "Вы проходите - не стесняйтесь.",
        "Если у Вас есть свободная минутка, наш текстовый помошник БИП проведет для Вас небольшое турне по нашему офису.",
        "А можете самостоятельно пройтись по офису и ознакомиться с представленными проектами.",
        "Что выбираете?",
      ];
      break;
    case 2:
      textMsg = [
        "Вы уже весь офис обошли?!",
        "Так быстро?",
        "Признавайтесь какой из проектов вам больше всего понравился?",
      ];
      break;
    case 3:
      textMsg = [
        "Походили, посмотрели и вернулись?",
        "Может быть всё-таки хотите, что бы наш текстовый помошник рассказал Вам о наших проектах?",
      ];
      break;
    case 4:
      textMsg = [
        "Вы еще тут?",
        "Вам так у нас понравилось?",
        "Мне тоже здесь нравится, а наш начальник просто класный парень!",
        "Вот недавно мы ему портрет подарили.",
        "Он его в нашем офисе повесил.",
        "Прямо за мной.",
        "Вы так хорошо меня слушаете, а ведь у меня работа стоит.",
        "Извените, мне надо работать.",
        "**Пишет код**",
      ];
      break;
    default:
      randomText = [
        "**Пьёт кофе**",
        "**Пишет код**",
        "**Изучает техническую статью**",
        "**Смотрит TikTok**",
        "**Исправляет баги**",
        "**Разговаривает по телефону**",
      ];
      var i = Math.floor(Math.random() * (6 - 0)) + 0;
      textMsg = [randomText[i]];
  }


  writeMessage(textMsg);
});

function writeMessage(text) {
  //Настройки скорости и времени появления текста
  const typSpd = 100;
  const waitTime = 1500;

  var mi = 0;

  function writeString(e, str, i) {
    e.innerHTML = e.innerHTML + str[i];

    if (e.innerHTML.length == str.length && mi != text.length)
      setTimeout(slowlyDelete, waitTime, e);
  }

  function deleteString(e) {
    e.innerHTML = e.innerHTML.substring(0, e.innerHTML.length - 1);

    if (e.innerHTML.length == 0)
      slowlyWrite(e, text[mi++]);
  }

  function slowlyDelete(e) {
    for (var i = 0; i < e.innerHTML.length; i++) {
      setTimeout(deleteString, typSpd / 2 * i, e);
    }
  }

  function slowlyWrite(e, str) {
    for (var i = 0; i < str.length; i++) {
      setTimeout(writeString, typSpd * i, e, str, i);
    }
  }
  const msg = document.querySelector(".msg-icn");

  slowlyDelete(msg);
}

window.addEventListener("unload", function () {
  if (flagBIPAgain) visitNumber += 2;
  else if (flagClick) visitNumber += 1;
  sessionStorage.bearMessage = visitNumber;
});