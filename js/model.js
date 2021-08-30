import {
  API_SLIDER_URL,
  API_CLOTHES_URL,
  API_AVAILABLE_IMAGES_URL,
} from './config.js';
import { getJSON } from './helpers.js';
export const sliderItems = [];
export const clothes = [];
export const availableImages = [];

///////////////////////////////////////////////////////////////////////
////////// FETCH PAGE DATA

(async function () {
  try {
    const data = await getJSON(`${API_AVAILABLE_IMAGES_URL}`);
    data.forEach(item => availableImages.push(item));
  } catch (err) {
    console.error(`Issues fetching available images ${err}`);
  }
})();

export const getSliderItems = async function () {
  try {
    const data = await getJSON(`${API_SLIDER_URL}`);
    data.forEach(function (item) {
      sliderItems.push(item);
    });
  } catch (err) {
    console.error(`Issues fetching slider images ${err}`);
    throw err;
  }
};

export const getClothes = async function () {
  try {
    const data = await getJSON(`${API_CLOTHES_URL}`);
    data.forEach(function (item) {
      clothes.push(item);
    });
  } catch (err) {
    console.error(`Issues fetching clothes ${err}`);
    throw err;
  }
};
