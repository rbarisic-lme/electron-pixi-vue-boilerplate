import * as PIXI from 'pixi.js'

const game = {
  run() {
    console.clear();
    console.log('hello world from pixi!');
    let app = new PIXI.Application({
      width: 480,
      height: 270,
    });

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    let gameTag = document.getElementById('game');
    gameTag.innerHTML = '';
    gameTag.appendChild(app.view);

  }
}


export default game;
