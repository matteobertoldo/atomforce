'use babel';

import etch from 'etch';
import Init from './init';
import PopoverHeader from './popover-header'; // eslint-disable-line no-unused-vars
import PopoverInfo from './popover-info'; // eslint-disable-line no-unused-vars
import Watcher from './watcher';

/** @jsx etch.dom */
export default class PopoverComponents {
    constructor () {
        this.props = new Init();
        this.watcher = new Watcher();
        etch.initialize(this);
    }

    render () {
        return (
            <div class="atomforce-popover-components">
                <PopoverHeader {...this.props} click={() => this.watch()} />
                <div class="atomforce-popover-body">
                    <PopoverInfo {...this.props} click={() => this.reload()}/>
                </div>
            </div>
        );
    }

    updateprops (watch, state) {
        this.props = new Init();
        this.props.watchFiles = watch;
        this.props.watchState = state;
        this.highlight();
    }

    async highlight () {
        const elem = document.getElementById('watch-state');
        elem.classList.add('highlight');

        const promise = new Promise(resolve => {
            setTimeout(() => resolve(elem.classList.remove('highlight')), 850);
        });

        await promise;
    }

    err () {
        const message = 'Failed to watch file';
        const description = 'It seems there are some errors in the <code>dw.json</code> file, or the file in the root of your project is missing. \n\n Reload Atomforce and try again.';

        atom.notifications.addError(message, {
            description,
            dismissable: true
        });
    }

    watch () {
        if (this.props.watchFiles) {
            this.updateprops(false, 'disabled');
            this.watcher.unwatch();
        } else {
            this.updateprops(true, 'enabled');

            if (this.props.dwFileExists && this.props.dwFileParse.parse) {
                this.watcher.watch(this.props.root, this.props.followSymlinks, this.props.ignoredList);
            } else {
                this.props.watchState = 'disabled';
                this.err();
            }
        }

        this.update();
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
        this.props.loader = true;
        this.update();
        this.spinner();
    }

    update () {
        etch.update(this);
    }
}
