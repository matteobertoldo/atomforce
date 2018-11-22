'use babel';

import etch from 'etch';
import Init from './init';
import PopoverHeader from './popover-header'; // eslint-disable-line no-unused-vars
import PopoverInfo from './popover-info'; // eslint-disable-line no-unused-vars

/** @jsx etch.dom */
export default class PopoverComponents {
    constructor () {
        this.props = new Init();
        etch.initialize(this);
    }

    render () {
        return (
            <div class="atomforce-popover-components">
                <PopoverHeader {...this.props} />
                <div class="atomforce-popover-body">
                    <PopoverInfo {...this.props} click={() => this.reload()}/>
                </div>
            </div>
        );
    }

    async spinner () {
        const promise = new Promise(resolve => {
            setTimeout(() => resolve(this.props.loader = false), 1500);
        });

        await promise;
        this.props = new Init();
        etch.update(this);
    }

    reload () {
        this.update();
        this.spinner();
    }

    update () {
        this.props.loader = true;
        etch.update(this);
    }
}
