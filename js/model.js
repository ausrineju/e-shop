export const sliderItems = [];
export const clothes = [];
export const availableImages = [];

///////////////////////////////////////////////////////////////////////
////////// FETCH PAGE DATA
const getJSON = function (url) {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error(`No items found ${resp.status}`);
    return resp.json();
  });
};

(async function () {
  try {
    const data = await getJSON('http://localhost:3000/availableImages');
    data.forEach(item => availableImages.push(item));
  } catch (err) {
    console.error(`Issues fetching available images ${err}`);
  }
})();

export const getSliderItems = async function () {
  try {
    const data = await getJSON('http://localhost:3000/sliderItems');
    data.forEach(function (item) {
      sliderItems.push(item);
    });
  } catch (err) {
    console.error(`Issues fetching slider images ${err}`);
  }
};

export const getClothes = async function () {
  try {
    const data = await getJSON('http://localhost:3000/clothes');
    data.forEach(function (item) {
      clothes.push(item);
    });
  } catch (err) {
    console.error(`Issues fetching clothes ${err}`);
  }
};
