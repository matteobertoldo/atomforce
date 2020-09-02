'use babel';

export default {
  entries(el) {
    return Object.prototype.hasOwnProperty.call(el, 'domNode')
      ? el.domNode.classList.contains('status-uploaded') &&
          !el.domNode.childNodes[0].classList.contains('status-removed')
      : false;
  }
};
