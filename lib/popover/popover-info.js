'use babel';

import etch from 'etch';
import Button from '../components/button-component';

/** @jsx etch.dom */
export default class PopoverInfo {
    constructor (props) {
        this.props = props;
        etch.initialize(this);
    }

    render () {
        if (this.props.loader) {
            return <span className="loading loading-spinner-tiny inline-block" />;
        } else if (this.props.rootDirectories === 0) {
            return (
                <div className="info">
                    At least <span className="text-highlight">one project must be connected</span> to start Atomforce.
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (this.props.rootDirectories > 1) {
            return (
                <div className="info">
                    Atomforce does not support <span className="text-highlight">multiple repositories</span>. Make sure
                    you have connected only one project.
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (!this.props.dwFileExists) {
            return (
                <div className="info fit-content">
                    The <span className="text-highlight">dw.json</span> file does not appear in the root of your
                    project.
                    <Button />
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (this.props.dwFileExists && !this.props.dwFileParse.parse) {
            return (
                <div className="info fit-content">
                    There are some missing or empty fields in the <span className="text-highlight">dw.json</span> file.
                    <Button />
                    <Button type="reload" click={this.props.click} />
                </div>
            );
        } else if (this.props.dwFileExists && this.props.dwFileParse.parse) {
            return (
                <div className="info">
                    <div>
                        Atomforce <span className="text-highlight">is ready to upload</span> file and cartridges. Click
                        on the switcher for enable watching files.
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
