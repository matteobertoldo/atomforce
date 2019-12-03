'use babel';

describe('Atomforce Status Bar', () => {
    beforeEach(() => {
        this.workspace = atom.views.getView(atom.workspace);
        this.statusbar = '#atomforce-status-bar';

        waitsForPromise(() => atom.packages.activatePackage('status-bar'));
        waitsForPromise(() => atom.packages.activatePackage('atomforce'));
    });

    describe('when the user activate atomforce package', () => {
        it('display the status bar icon cloud', () => {
            runs(() => {
                expect(this.workspace.querySelector(this.statusbar)).toExist();
            });
        });
    });
});
