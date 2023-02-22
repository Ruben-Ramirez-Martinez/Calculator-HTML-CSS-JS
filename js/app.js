const onAndAllClearScreen = document.querySelector('.onAndAllClearScreen');

let calculatorOn = false;

const startCalculator = () => {
  
  const operators          = document.querySelectorAll('.operator'),
        screen             = document.querySelector   ('.screen'),
        numbers            = document.querySelectorAll('.number'),
        decimalPoint       = document.querySelector   ('.point'),
        clearLastCharacter = document.querySelector   ('.clear'),
        equal              = document.querySelector   ('.equal');


  let resultDisplayed   = false,
      adaptScreemLength = 0,
      positionSymbolSubtraction,
      positionSymbolPercentage,
      positionSymbolMultiply,
      positionSymbolDivide,
      operatorsToOperate,
      positionSymbolSum,
      numbersToOperate;

  const resetScreen = () => {
    screen.innerHTML = '0';
  };

  resetScreen();

  const prepareEmptyScreen = () => {
    if (screen.innerHTML === '0' || screen.innerHTML === 'No se puede dividir entre 0') {
      screen.innerHTML        = '';
      screen.classList.remove('screenmessage');
    };
  };

  const getPercentage = () => {   
    numbersToOperate.splice(positionSymbolPercentage, 2, numbersToOperate[positionSymbolPercentage] / 100 * numbersToOperate[positionSymbolPercentage + 1] || numbersToOperate[positionSymbolPercentage] / 100 ) 
    operatorsToOperate.splice(positionSymbolPercentage, 1);
    return positionSymbolPercentage = operatorsToOperate.indexOf('%') 
  };

  const getDivision = () => {  

    numbersToOperate.splice(positionSymbolDivide, 2, numbersToOperate[positionSymbolDivide] / numbersToOperate[positionSymbolDivide + 1]);
    operatorsToOperate.splice(positionSymbolDivide, 1)

    if (numbersToOperate.includes(Infinity)) {
      
      numbersToOperate       = ['No se puede dividir entre 0'];
      operatorsToOperate     = [];
      screen.classList.add('screenmessage');
    };
    return positionSymbolDivide = operatorsToOperate.indexOf('÷');
  };

  const getMultiplication = () => {   
    numbersToOperate.splice(positionSymbolMultiply, 2, numbersToOperate[positionSymbolMultiply] * numbersToOperate[positionSymbolMultiply + 1]);
    operatorsToOperate.splice(positionSymbolMultiply, 1)
    return positionSymbolMultiply = operatorsToOperate.indexOf('x');  
  };

  const getSubtraction = () => {   
    numbersToOperate.splice(positionSymbolSubtraction, 2, numbersToOperate[positionSymbolSubtraction] - numbersToOperate[positionSymbolSubtraction + 1]);
    operatorsToOperate.splice(positionSymbolSubtraction, 1)
    return positionSymbolSubtraction = operatorsToOperate.indexOf('-');
  };

  const getSum = () => {   
    numbersToOperate.splice(positionSymbolSum, 2, +numbersToOperate[positionSymbolSum] + +numbersToOperate[positionSymbolSum + 1]);
    operatorsToOperate.splice(positionSymbolSum, 1)
    return positionSymbolSum = operatorsToOperate.indexOf('+'); 
  };

  for (let i = 0; i < numbers.length; i++) {
  
    numbers[i].addEventListener('click', (number)=> {

      if(screen.innerHTML.length >= 19 + adaptScreemLength && screen.innerHTML !== 'No se puede dividir entre 0') return;
      
      prepareEmptyScreen();
      
      const currentScreen   = screen.innerHTML,
      lastCharacterOfScreen = currentScreen[currentScreen.length -1];
      
      if (Number.isNaN(+lastCharacterOfScreen) && number.target.innerHTML === '.') {
        screen.innerHTML += '0';
      };

      if (!resultDisplayed) screen.innerHTML += number.target.innerHTML;
      
      if (resultDisplayed && (lastCharacterOfScreen === '-' || lastCharacterOfScreen === '+' || lastCharacterOfScreen === 'x' || lastCharacterOfScreen === '÷' || lastCharacterOfScreen === '%')) { 
        resultDisplayed  = false;
        screen.innerHTML += number.target.innerHTML;  
      };
      
      if(resultDisplayed) {

        decimalPoint.disabled = false;
        resultDisplayed       = false;
        screen.innerHTML      = '';
        screen.innerHTML      += number.target.innerHTML;   

        if (screen.innerHTML === '.') screen.innerHTML = '0.';

      };
      
      if (number.target.innerHTML === '.') {
        decimalPoint.disabled = true;
      };

    });
  };
  
  for (let i = 0; i < operators.length; i++) {
    
    operators[i].addEventListener('click', (operator)=>{
      
      prepareEmptyScreen();

      const currentScreen         = screen.innerHTML,
            lastCharacterOfScreen = currentScreen[currentScreen.length -1];

      if (lastCharacterOfScreen === '.') {
        const deletePoint = currentScreen.substring(0, currentScreen.length - 1);
        screen.innerHTML  = deletePoint;
      }

      if ( currentScreen.length !== 1 && (lastCharacterOfScreen === '-' || lastCharacterOfScreen === '+' || lastCharacterOfScreen === 'x' || lastCharacterOfScreen === '÷' || lastCharacterOfScreen === '%')) {
        
        
        const changeOperator = currentScreen.substring(0, currentScreen.length - 1) + operator.target.innerHTML;  
        screen.innerHTML = changeOperator;

      } else if (currentScreen.length === 0 && operator.target.innerHTML !== '-' || currentScreen === '-') {
        
        if(currentScreen !== '-') resetScreen();

      } else {
        if(screen.innerHTML.length >= 20) return;
       
        screen.innerHTML += operator.target.innerHTML;

        if(screen.innerHTML.length >= 19) adaptScreemLength = 4;
      };

      decimalPoint.disabled = false;
    });
  };
  
  equal.addEventListener('click', ()=> {

    if (Number.isNaN(+screen.innerHTML[screen.innerHTML.length - 1]) && screen.innerHTML[screen.innerHTML.length - 1] !== '%' ) return screen.innerHTML = '0';

    const stringToOperate = screen.innerHTML;
  
    numbersToOperate   = stringToOperate.split(/\-|\+|\x|\÷|\%/g);
    operatorsToOperate = stringToOperate.replace(/[0-9]|\./g, '').split('');

    if (numbersToOperate[numbersToOperate.length -1] === '') numbersToOperate.pop();
    
    positionSymbolPercentage = operatorsToOperate.indexOf('%');
    while (positionSymbolPercentage !== -1) {
      getPercentage();
    };
  
    positionSymbolDivide = operatorsToOperate.indexOf('÷');
    while (positionSymbolDivide !== -1) {
      getDivision();
    };
    
    positionSymbolMultiply = operatorsToOperate.indexOf('x');
    while (positionSymbolMultiply !== -1) {
      getMultiplication();
    };
    
    positionSymbolSubtraction = operatorsToOperate.indexOf('-');
    while (positionSymbolSubtraction !== -1) {
      getSubtraction();
    };

    positionSymbolSum = operatorsToOperate.indexOf('+');
    while (positionSymbolSum !== -1) {
      getSum();
    };

    screen.innerHTML = numbersToOperate[0];
    decimalPoint.disabled = false;
    adaptScreemLength     = 0;
    resultDisplayed       = true;

    if(screen.innerHTML.length >= 19 && screen.innerHTML !== 'No se puede dividir entre 0') {
        const newStreng  = screen.innerHTML.substring(0, 19);
        screen.innerHTML = newStreng;
    };

    if (screen.innerHTML.includes('.')) decimalPoint.disabled = true;
  });
  
  clearLastCharacter.addEventListener('click', ()=>{
    
    prepareEmptyScreen();

    const currentScreen         = screen.innerHTML,
          lastCharacterOfScreen = currentScreen[currentScreen.length -1];
    
    if (lastCharacterOfScreen === '.') decimalPoint.disabled = false;
    if (lastCharacterOfScreen != '.' && Number.isNaN(+lastCharacterOfScreen)) adaptScreemLength = 0;
    
    screen.innerHTML  = currentScreen.slice(0, currentScreen.length -1);
    
    if (screen.innerHTML === '') resetScreen();

    resultDisplayed = false;
  });
  
  onAndAllClearScreen.addEventListener('click', ()=>{
    prepareEmptyScreen();
    resetScreen();
    decimalPoint.disabled = false;
    adaptScreemLength     = 0;
  });
};

onAndAllClearScreen.addEventListener('click', ()=>{
  if (!calculatorOn) {
    calculatorOn = true;
    startCalculator();
  };
});