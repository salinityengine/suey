import {
    PANEL_STYLES,
} from '../constants.js';
import { Div } from '../core/Div.js';

class Panel extends Div {

    constructor({
        style = PANEL_STYLES.NONE,
    } = {}) {
        super();
        this.setClass('suey-panel');
        this.contents = function() { return this; }

        // Panel Style
        if (style === PANEL_STYLES.SIMPLE) {
            this.addClass('suey-panel-simple');
        } else if (style === PANEL_STYLES.FANCY) {
            this.addClass('suey-panel-fancy');
            const outerBox =  new Panel().setClass('suey-panel-fancy-outer');   // Padding
            const borderBox = new Panel().setClass('suey-panel-fancy-border');  // Border
            const insideBox = new Panel().setClass('suey-panel-fancy-inside');  // Interior
            borderBox.add(insideBox);
            outerBox.add(borderBox);
            this.add(outerBox);
            this.contents = function() { return insideBox; };                   // Accessor for inside panel
        }

        // Disable context menu
        this.on('contextmenu', (event) => { event.preventDefault(); });
    }

}

export { Panel };
