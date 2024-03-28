import { Div } from '../core/Div.js';
import { Span } from '../core/Span.js';
import { ShadowBox } from './ShadowBox.js';

class AssetBox extends Div {

    constructor(title = '', view = 'icon', isMini = true) {
        super();
        this.setClass('suey-asset-box');
        this.allowFocus();

        // Tooltip
        if (title !== '') this.dom.setAttribute('tooltip', title);

        // Set Name
        if (typeof title !== 'string' || title === '') title = 'Unknown';
        this.name = title.toLowerCase();

        // Image
        const assetImageHolder = new ShadowBox();
        assetImageHolder.dom.draggable = true;

        // Display Format
        if (view == 'icon') {
            if (isMini) {
                this.addClass('suey-asset-box-mini');
                this.addClass('suey-asset-box-selectable');
            }
            this.add(assetImageHolder);

        } else if (view == 'text') {
            if (isMini) {
                this.addClass('suey-asset-box-mini');
                this.addClass('suey-asset-box-combo');
                this.addClass('suey-asset-box-selectable');
            }
            assetImageHolder.setStyle('transform', 'translate(-50%, -65%) scale(0.8)');
            this.add(assetImageHolder);
            const label = new Div(title).setClass('suey-asset-box-label');
            this.add(label);

        } else { /* if (view == 'list') */
            this.addClass('suey-asset-box-row');
            this.addClass('suey-asset-box-selectable');
            const spanIcon = new Span().setClass('suey-asset-box-icon').add(assetImageHolder);
            const spanText = new Span(title).setClass('suey-asset-box-text');
            this.add(spanIcon, spanText);
            this.assetText = spanText;
        }

        // Contents Function
        this.contents = function() { return assetImageHolder };

    }

}

export { AssetBox };
