import Potato from './potato.jpg';
import altText from './potato.txt';
function addImage() {
  const img = document.createElement('img');
  img.alt = 'Image';
  img.width = 300;
  img.src = Potato;
  img.alt = altText;
  const body = document.querySelector('body');
  body.appendChild(img);
}
export default addImage;