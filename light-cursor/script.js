let lights = document.querySelectorAll('.light');

document.body.onmousemove = (e) => moveLight(e);
document.onclick = (e) => applyCursorRippleEffect(e);

function moveLight(e) {
  // set light positions
  for (let i = 0; i < lights.length; i++) {
    lights[i].style.left = `${e.clientX - 13}px`;
    lights[i].style.top = `${e.clientY - 13}px`;
  }
}

function applyCursorRippleEffect(e) {
  // remove light classes
  for (let i = 0; i < lights.length; i++) {
    lights[i].className = '';
  }

  // create and apply ripple effect
  const ripple = document.createElement('div');
  ripple.className = 'light-ripple';
  document.body.appendChild(ripple);
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  ripple.style.animation = 'ripple-effect .4s linear';

  // set light back to original class
  ripple.onanimationend = () => {
    document.body.removeChild(ripple);
    lights[0].className = 'light';
    lights[1].className = 'light light-tail';
  };
}
