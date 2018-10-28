const supportsCSS = (property, value) => {
  try {
    let element = document.createElement('span');

    if (element.style[property] !== undefined) {
      element.style[property] = value;
    } else {
      return false;
    }

    return element.style[property] === value;
  } catch (e) {

    return false;
  }
}

export default supportsCSS