import { use } from 'typescript-mix';
import { Node } from '../behaviours/node';
import { Transform } from '../behaviours/transform';
import { h, VNode, Projector } from 'maquette';
import { SyncEvent } from 'ts-events';
import { Factory } from '../behaviours/factory';
import { Vector2 } from '../helpers/vector2';

// tslint:disable-next-line:interface-name
export interface Scene extends Node, Transform, Factory { }

export class Scene {
	@use(Node, Transform, Factory) public this: any;

	public resolution: Vector2;

	public enterEvent: SyncEvent<void>;
	public leaveEvent: SyncEvent<void>;

	constructor (id: string, projector: Projector) {
		this.id = id;
		this.resolution = new Vector2(1280, 720);
		this.enterEvent = new SyncEvent<void>();
		this.leaveEvent = new SyncEvent<void>();
		this._projector = projector;
		this.resetTransform();
		this.resetStyle();
		this.enable = false;
	}

	public enter () {
		if (this.enable) return;
		this.enable = true;
		this.enterEvent.post();
		this.refresh();
	}

	public leave () {
		if (!this.enable) return;
		this.enable = false;
		this.leaveEvent.post();
		this.refresh();
	}

	public createLayer = (id: string, classname?: string) => this.create('layer', id, classname) as Node;

	public render (): VNode {
		const styles = {} as any;
		styles.display = this.enable ? 'block' : 'none';

		const screenRatio = window.innerWidth / window.innerHeight;
		const gameRatio = this.resolution.x / this.resolution.y;

		if (screenRatio <= gameRatio) {
			styles.width = '100vw';
			styles.height = '56.25vw';
			styles.marginTop = '-28.125vw';
			styles.marginLeft = '0vw';
			styles.top = '50vh';
			styles.left = '0vh';
		} else {
			styles.width = '177vh';
			styles.height = '100vh';
			styles.marginTop = '0vh';
			styles.marginLeft = '-88.5vh';
			styles.top = '0vw';
			styles.left = '50vw';
		}

		return h('div', {
			id: this.id,
			key: this.id,
			class: 'scene',
			styles
		}, this._childrens.map((x) => {
			return x.render();
		}));
	}

	// helpers
	public onEnter (cb: () => void) {
		this.enterEvent.attach(cb);
	}

	public onLeave (cb: () => void) {
		this.leaveEvent.attach(cb);
	}
}
