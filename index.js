let btn = document.getElementById('sub');
let addy = document.getElementById('exampleAddress1');
let pC = document.getElementById('examplePc1');
let cC = document.getElementById('exampleCc1');
let addText = document.getElementById('addText');
let spl = document.getElementById('spl');
let xmax = document.getElementById('xmax');
let xmin = document.getElementById('xmin');
let ymax = document.getElementById('ymax');
let ymin = document.getElementById('ymin');

const apiKey = 'KEY_HERE';

btn.addEventListener('click', function (e) {
  e.preventDefault();
  getLocation(addy.value, pC.value, cC.value);
  // addText.textContent = data[0].address;
});

function getLocation(address, postalCode, countryCode) {
  let res = '';
  try {
    const authentication = new arcgisRest.ApiKey({
      key: apiKey
    });
    // console.log(address + postalCode + countryCode);

    arcgisRest
      .geocode({
        address: address,
        postal: postalCode,
        countryCode: countryCode,
        authentication
      })
      .then(response => {
        // console.log('Candidates:', response.candidates);
        // document.getElementById('result').textContent = JSON.stringify(response.candidates, null, 2);
        // res = JSON.stringify(response.candidates, null, 2);

        console.log(response.candidates);
        res = response.candidates;
        addText.textContent = res[0].address;
        spl.textContent = res[0].location.spatialReference.wkid;
        xmax.textContent = res[0].extent.xmax;
        ymax.textContent = res[0].extent.ymax;
        xmin.textContent = res[0].extent.xmin;
        ymin.textContent = res[0].extent.ymin;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
}
