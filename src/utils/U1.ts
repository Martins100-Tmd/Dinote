let colors = ['green', 'blue', 'cyan', 'red', 'emerald', 'yellow', 'orange', 'teal'];

const randomColor = function () {
   let randIndex = Math.floor(Math.random() * colors.length);
   return `${colors[randIndex]}`;
};

let func = {
   randomColor,
};

export default func;
