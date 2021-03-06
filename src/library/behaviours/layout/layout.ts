import { JilNode } from '../core/node';
import { getComponent } from '../../helpers';

export interface LayoutOption {
	preferedWidth?: number;
	preferedHeight?: number;
	paddingWidth?: number;
	paddingHeight?: number;
	scrollable?: boolean;
	rowNumber?: number;
	colNumber?: number;
}

export class Layout {
	public layout: string = 'default';
	public layoutParams: LayoutOption = {};

	public resetLayout () {
		const node = getComponent<JilNode>(this);
		this.layout = 'default';
		this.layoutParams = {};
		if (node.nodeEvent) {
			node.nodeEvent.attach((evt) => {
				if (evt !== 'added' && evt !== 'removed') return;
				this.refreshLayout();
			});
		}
	}

	public setLayout (layout: string, params?: LayoutOption) {
		this.layout = layout ? layout : this.layout;
		this.layoutParams = params ? params : this.layoutParams;
		this.refreshLayout();
	}

	public refreshLayout () {
		getComponent<JilNode>(this);
	}
}
