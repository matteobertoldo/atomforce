'use babel';

import etch from 'etch';
import Button from '../components/button-component'; // eslint-disable-line no-unused-vars

/** @jsx etch.dom */
export default class PopoverInfo {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        if (this.props.loader) {
            return <span class="loading loading-spinner-tiny inline-block" />;
        } else if (this.props.rootDirectories === 0) {
            return (
                <div class="info">
                    At least <span class="text-highlight">one project must be connected</span> to start Atomforce.
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (this.props.rootDirectories > 1) {
            return (
                <div class="info">
                    Atomforce does not support <span class="text-highlight">multiple repositories</span>. Make sure you
                    have connected only one project.
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (!this.props.dwFileExists) {
            return (
                <div class="info fit-content">
                    The <span class="text-highlight">dw.json</span> file does not appear in the root of your project.
                    <Button />
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (this.props.dwFileExists && !this.props.dwFileParse.parse) {
            return (
                <div class="info fit-content">
                    There are some missing or empty fields in the <span class="text-highlight">dw.json</span> file.
                    <Button />
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (this.props.dwFileExists && this.props.dwFileParse.parse) {
            return (
                <div class="info">
                    <div>
                        Atomforce <span class="text-highlight">is ready to upload</span> file and cartridges. Click on
                        the switcher for enable watching files.
                    </div>
                </div>
            );
        }
    }

    update (props) {
        this.props = props;
        etch.update(this);
    }
}
