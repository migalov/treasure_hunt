/* Счетчики игры */
let STATUS_GAME = false,
    COUNT_ATTEMPTS = 0,
    MAX_COUNT_ATTEMPTS = 25,
    coordsTreasureX = 0,
    coordsTreasureY = 0;

const mapImage = document.querySelector(`#map`),
      message = document.querySelector(`.message`),
      attempts = document.querySelector(`.attempts`),
      buttonStartGame =  document.querySelector(`#start-game`),

      /* Получаем случайное число */
      getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      },

      /* Вычисляем дистанцию от места нажатия на карте до клада */
      getDistance = (_e, x, y) => {
        console.log(_e);
        let diffX = _e.offsetX - x;
        let diffY = _e.offsetY - y;
        let distance = Math.sqrt(( diffX*diffX ) + (diffY*diffY));
        return distance;
      },

      /* Сообщаем о том, насколько мы близки к кладу */
      showMessageDistance = (pixels) => {

        animationMessage(`message`, 500);
        COUNT_ATTEMPTS++;

        if(COUNT_ATTEMPTS >= MAX_COUNT_ATTEMPTS) {

          message.innerText = `🙁 You have used up all attempts. Start the game over.`
          showMessageCountAttempts(COUNT_ATTEMPTS);
          STATUS_GAME = false;

          return;

        }
        switch(true) {
          case (pixels < 20): message.innerText = `🎊 Congratulations, you have found a treasure.`; break;
          case (pixels >= 20 && pixels < 50): message.innerText = `🌋 Very hot.`; break;
          case (pixels >= 50 && pixels < 90): message.innerText = `🔥 Hot.`; break;
          case (pixels >= 90 && pixels < 140): message.innerText = `♨️ Warm.`; break;
          case (pixels >= 140 && pixels < 200): message.innerText = `🌨️ Cold.`; break;
          case (pixels >= 200): message.innerText = `🥶 Very cold.`; break;
        }
        showMessageCountAttempts(COUNT_ATTEMPTS);
      },

      /* Простая анимация сообщения */
      animationMessage = (element, duration) => {
        document.querySelector(`.${element}`).classList.add(`${element}--show`);
        setTimeout(() => {
          message.classList.remove(`${element}--show`);
        }, duration)
      }

      /* Сообщение о количестве оставшихся попыток */
      showMessageCountAttempts = (count) => {
        attempts.innerHTML = `Left ${MAX_COUNT_ATTEMPTS - count} attempts`
      }

      /* Начинаем новую игру */
      startGame = () => {

        STATUS_GAME = true;
        COUNT_ATTEMPTS = 0;

        message.innerText = `🙂 Go looking for treasure!`;
        showMessageCountAttempts(COUNT_ATTEMPTS);

        coordsTreasureX = getRandomInt(mapImage.offsetWidth);
        coordsTreasureY = getRandomInt(mapImage.offsetHeight);

      };

buttonStartGame.addEventListener("click", startGame);
mapImage.addEventListener("click", (e) => {
  if (STATUS_GAME) {
    let distance = getDistance(e, coordsTreasureX, coordsTreasureY);
    showMessageDistance(distance);
  }
})







