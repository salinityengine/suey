import { Box2 } from '../math/Box2.js';
import { ColorStyle } from './style/ColorStyle';
import { Object2D } from '../Object2D.js';
import { Vector2 } from '../math/Vector2.js';

class Text extends Object2D {

    constructor(text = '', font = '16px Arial') {
        super();
        this.type = 'Text';

        this.text = text;
        this.font = font;

        this.context = null;
        this.strokeStyle = null;
        this.lineWidth = 1;
        this.fillStyle = new ColorStyle('#000000');

        this.textAlign = 'center';      // https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
        this.textBaseline = 'middle';   // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
    }

    computeBoundingBox() {
        if (!this.context) return false;
        const context = this.context;
        context.font = this.font;
        context.textAlign = this.textAlign;
        context.textBaseline = this.textBaseline;
        const textMetrics = context.measureText(this.text);
        const textWidth = textMetrics.width;
        const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
        this.boundingBox.set(new Vector2(textWidth / -2, textHeight / -2), new Vector2(textWidth / 2, textHeight / 2));
    }

    isInside(point) {
        return this.boundingBox.containsPoint(point);
    }

    draw(context, camera, canvas) {
        if (this.context !== context) {
            this.context = context;
            this.computeBoundingBox();
        }
        context.font = this.font;
        context.textAlign = this.textAlign;
        context.textBaseline = this.textBaseline;

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle.get(context);
            context.fillText(this.text, 0, 0);
        }
        if (this.strokeStyle) {
            context.strokeStyle = this.strokeStyle.get(context);
            context.strokeText(this.text, 0, 0);
        }
    }

}

export { Text };