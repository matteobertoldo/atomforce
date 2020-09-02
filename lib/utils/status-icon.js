'use babel';

const cleanClass = (className, elem) => {
  const classes = ['connected', 'uploading', 'error'];
  const index = classes.indexOf(className);
  const child = elem.childNodes[0];

  if (index > -1) classes.splice(index, 1);

  for (let i = 0; i < classes.length; i++) {
    elem.classList.remove(classes[i]);
  }

  return elem.classList.contains('uploading')
    ? (child.className = 'icon icon-arrow-up')
    : (child.className = 'icon icon-cloud-upload');
};

export default {
  icon(className) {
    const elem = document.getElementById('atomforce-status-bar');

    if (elem) {
      if (className) elem.classList.add(className);
      cleanClass(className, elem);
    }
  }
};
