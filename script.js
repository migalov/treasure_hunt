const mapImage = document.querySelector(`#map`),
      message = document.querySelector(`.message`),
      buttonStartGame =  document.querySelector(`#start-game`),

      getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      },

      getDistance = (_e, x, y) => {
        console.log(_e);
        let diffX = _e.offsetX - x;
        let diffY = _e.offsetY - y;
        let distance = Math.sqrt(( diffX*diffX ) + (diffY*diffY));
        return distance;
      },

      showMessage = (pixels) => {
        console.log(pixels);
        message.innerText = "";
        switch(true) {
          case (pixels < 20):
              message.innerText = `🎊 Congratulations, you have found a treasure.`;
              mapImage.removeEventListener("click");
          case (pixels >= 20 && pixels < 50): message.innerText = `🌋 Very hot.`; break;
          case (pixels >= 50 && pixels < 90): message.innerText = `🔥 Hot.`; break;
          case (pixels >= 90 && pixels < 140): message.innerText = `♨️ Warm.`; break;
          case (pixels >= 140 && pixels < 200): message.innerText = `🌨️ Cold.`; break;
          case (pixels >= 200): message.innerText = `🥶 Very cold.`; break;
        }
      },

      startGame = () => {
        message.innerText = `🙂 Go looking for treasure!`;

        let coordsTreasureX = getRandomInt(mapImage.offsetWidth);
        let coordsTreasureY = getRandomInt(mapImage.offsetHeight);
        
        mapImage.addEventListener("click", (e) => {
          let distance = getDistance(e, coordsTreasureX, coordsTreasureY);
          showMessage(distance);
        })
        
      };

buttonStartGame.addEventListener("click", startGame);







