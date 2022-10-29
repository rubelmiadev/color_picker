/**
 * Author:Rubel Mia
 * Date: 12-9-2022
 * Description:color Picker application
  */

/*Globals*/

/* Onload handler */

window.onload = () => {
  main();
}



/* Main  function  or boot function*/

function main() {
  const randomColorBtn = document.getElementById('random-color-btn')
  const colorHexInput = document.getElementById('color-hex');
  const colorSliderRed = document.getElementById('color-slider-red');
  const colorSliderGreen = document.getElementById('color-slider-green');
  const colorSliderBlue = document.getElementById('color-slider-blue');
 const copyToClipboardBtn = document.getElementById('copy-to-clipboard');










  randomColorBtn.addEventListener('click', handleGenerateRandomColorBtn)
  colorHexInput.addEventListener('keyup', handleHexColorInput)

  colorSliderRed.addEventListener('change', colorSliderChange(colorSliderRed, colorSliderGreen, colorSliderBlue))
  colorSliderGreen.addEventListener('change', colorSliderChange(colorSliderRed, colorSliderGreen, colorSliderBlue))
  colorSliderBlue.addEventListener('change', colorSliderChange(colorSliderRed, colorSliderGreen, colorSliderBlue))
  copyToClipboardBtn.addEventListener('click', colorSelectionMode)



}


/* Even handlers*/
function handleGenerateRandomColorBtn() {
  const color = genetateRandomColorDecimal()
  updateColorCodeToDom(color)
};


function handleHexColorInput(e) {
  const hexColor = e.target.value

  if (hexColor) {
    this.value = hexColor.toUpperCase()

    if (isValidHex(hexColor)) {
      const color = hexToDecimal(hexColor)
      updateColorCodeToDom(color)
    }
  }

}

function colorSliderChange(colorSliderRed, colorSliderGreen, colorSliderBlue) {

  return function () {

    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value)
    }
    updateColorCodeToDom(color)
  }


}

function colorSelectionMode(){
  const colorRadioBtn =document.getElementsByName('color-mode');
  const mode =getCheckedValue(colorRadioBtn)
  if(mode ===null){
    throw new Error('Invalid color selection mode')
  }
  if(mode ==='hex'){
    const hexColor =document.getElementById('color-hex').value
    if(hexColor && isValidHex(hexColor)){
      navigator.clipboard.writeText(`#${hexColor}`)
    }
    
  }else{
    const rgbColor =document.getElementById('color-rgb').value
    if(rgbColor){
      navigator.clipboard.writeText(rgbColor)
    }
  }
}


/* Dom functions*/

function updateColorCodeToDom(color) {

  const hexColor = generateHexColorCode(color)
  const rgbColor = generateRgbColorCode(color)

  document.getElementById('display-color').style.backgroundColor = `#${hexColor}`
  document.getElementById('color-hex').value = hexColor
  document.getElementById('color-rgb').value = rgbColor
  document.getElementById('color-slider-red').value = color.red
  document.getElementById('slider-label-red').innerText = color.red
  document.getElementById('color-slider-green').value = color.green
  document.getElementById('slider-label-green').innerText = color.green
  document.getElementById('color-slider-blue').value = color.blue
  document.getElementById('slider-label-blue').innerText = color.blue


}







/**
 * find a checked element in node list of radio buttons
 * @param {array} nodes
 * @return checked value
 */

function getCheckedValue(nodes) {
 let checkedValue =null;
  for (let i = 0; i < nodes.length; i++) {
    if(nodes[i].checked) {
      checkedValue = nodes[i].value
      break;
    }
  }
    return checkedValue;



}





/* another function*/




/**
 * generate and return an object of three color desimal values
 * @return {Object}
 */
function genetateRandomColorDecimal() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue
  }
}



/**
 * take a object of three color desimal values and return a hex color code
 *@param {object} color
 *@return {string}
 */

function generateHexColorCode({ red, green, blue }) {
  const getTwoCode = (value) => {
    let hex = value.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  };
  return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase()

}


/**
 * take a object of three color desimal values and return a Rgb color code
 *@param {object} color
 *@return {string}
 */

function generateRgbColorCode({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * take a hex code and convert  desimal values and 
 * @param {string} hex
 * @return {object}
 */

function hexToDecimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return { red, green, blue };
}



/* Utails*/

/**
 * @param {string}
 * @return {string}
 */

function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9a-fA-F]{6}$/i.test(color)
}