import './style.css'
import Pyramid from 'pyramid-game-lib';
import wood from './assets/wood-box.jpg?url';
import metal from './assets/metal-box.jpg?url';
import texture from './assets/ground-texture.jpg?url';

const app = document.querySelector<HTMLDivElement>('#app')!;

const { Game, Globals, Util } = Pyramid;
const { Vector3, Vector2 } = Util;

const globals = new Globals({
	score: 0,
	player: { x: 0, z: 0 }
})

const game = new Game({
	setup: async ({ primitives, triggers }) => {
		const { createBox, createSphere } = primitives;
		const { createAreaTrigger } = triggers;

		createBox({ texturePath: wood, position: new Vector3(-1, 0, 0.5), width: 1, height: 1, depth: 1 });
		createSphere({ texturePath: metal, position: new Vector3(1.5, 5, 3.5), radius: 0.5 });
		createSphere({ texturePath: metal, position: new Vector3(2.5, 5, 4.5), radius: 0.5 });
		createSphere({ texturePath: metal, position: new Vector3(2, 5, 4), radius: 0.5 });
		createBox({ texturePath: texture, textureSize: new Vector2(8, 8), position: new Vector3(0, -1, 0), width: 100, height: 1, depth: 100, fixed: true });

		let boxTrigger = createAreaTrigger({
			debugColor: 0x00FF00, showDebug: true, position: new Vector3(0, 3.5, -20), width: 30, height: 10, depth: 15,
			action: () => {
				if (!boxTrigger.enteredTrigger) {
					console.log("entered trigger area");
					boxTrigger.debugColor = 0xBADA55;
					boxTrigger.enteredTrigger = true;
				}
			},
			exitAction: () => {
				if (boxTrigger.enteredTrigger) {
					console.log("left trigger area");
					boxTrigger.enteredTrigger = false;
				}
			}
		});
	},
	loop: ({ inputs }) => {
		const { horizontal, vertical, buttonA, buttonB } = inputs[0];
		let movement = new Vector3();
		movement.setX(horizontal * 10);
		movement.setZ(vertical * 10);
		if (buttonA) {
			console.log("A Pressed");
		}
		if (buttonB) {
			console.log("B Pressed");
		}
	}
});
game.ready.then(() => {
	console.log(globals.current());
	app.appendChild(game.domElement());
})

