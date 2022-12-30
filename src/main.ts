import './style.css'
import Pyramid from 'pyramid-game-lib';
import wood from './assets/wood-box.jpg?url';
import ground from './assets/ground-texture.jpg?url';
import test from './assets/texture-test.png?url';

const app = document.querySelector<HTMLDivElement>('#app')!;

const { Game, Util } = Pyramid;
const { Box, Sphere, Materials } = Pyramid.Entity;
const { Vector3, Vector2 } = Util;

@Box({
	showDebug: true,
	fixed: true,
	texturePath: ground,
	textureSize: new Vector2(8, 8),
	color: 0xFFDEAD,
	width: 100,
	height: 0.2,
	depth: 100
})
export class Ground { }

@Box({
	debugColor: 0xBADA55,
	showDebug: true,
	texturePath: wood,
	width: 2,
	height: 2,
	depth: 2
})
export class WoodBox {
	setup({ entity }: any) {
		console.log(`Entity: ${entity}`);
	}
}

@Sphere({
	material: Materials.metal,
	texturePath: test,
	position: new Vector3(3, 2, -3),
	radius: 1
})
export class Ball {
	timer: number = 2;

	loop({ entity, delta }: any) {
		this.timer += delta;
		if (this.timer > 2) {
			entity.body.applyImpulse(new Vector3(0, 50, 0));
			this.timer = 0;
		}
	}
}

@Game(app)
class SampleGame {
	async setup({ commands }: any) {
		const { create } = await commands;
		create(WoodBox, { position: new Vector3(1, 2, 1) });
		create(Ground);
		create(Ball);
	}

	loop({ inputs }: any) {
		const { horizontal, vertical, buttonA, buttonB } = inputs[0];
		if (horizontal !== 0 || vertical !== 0) {
			let movement = new Vector3();
			movement.setX(horizontal * 10);
			movement.setZ(vertical * 10);
			console.log(movement);
		}
		if (buttonA) {
			console.log("A Pressed");
		}
		if (buttonB) {
			console.log("B Pressed");
		}
	}

	ready() { }
}

new SampleGame();