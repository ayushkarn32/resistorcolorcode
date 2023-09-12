import React, { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [isFourBand, setIsFourBand] = useState(true);
  const [selectedBand1, setSelectedBand1] = useState(0);
  const [selectedBand2, setSelectedBand2] = useState(0);
  const [selectedBand3, setSelectedBand3] = useState(0);
  const [selectedMultiplier, setSelectedMultiplier] = useState(0);
  const [selectedTolerance, setSelectedTolerance] = useState(10);
  const [tolerance, setTolerance] = useState(5);

  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
  
    window.addEventListener('resize', updateWindowWidth);

  
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const shouldTruncate = windowWidth < 500;


  const fiveBandArr = [
    {
      band1: '0',
      band2: '0',
      band3: '0',
      multiplier: '1',
      tolerance: ' ',
    },
    {
      band1: '100',
      band2: '10',
      band3: '1',
      multiplier: '10',
      tolerance: '1',
    },
    {
      band1: '200',
      band2: '20',
      band3: '2',
      multiplier: '100',
      tolerance: '2',
    },
    {
      band1: '300',
      band2: '30',
      band3: '3',
      multiplier: '1k',
      tolerance: ' ',
    },
    {
      band1: '400',
      band2: '40',
      band3: '4',
      multiplier: '10k',
      tolerance: ' ',
    },
    {
      band1: '500',
      band2: '50',
      band3: '5',
      multiplier: '100k',
      tolerance: '0.5',
    },
    {
      band1: '600',
      band2: '60',
      band3: '6',
      multiplier: '1M',
      tolerance: '0.25',
    },
    {
      band1: '700',
      band2: '70',
      band3: '7',
      multiplier: '10M',
      tolerance: '0.10',
    },
    {
      band1: '800',
      band2: '80',
      band3: '8',
      multiplier: ' ',
      tolerance: '0.05',
    },
    {
      band1: '900',
      band2: '90',
      band3: '9',
      multiplier: ' ',
      tolerance: ' ',
    },
    {
      band1: '',
      band2: '',
      band3: '',
      multiplier: '0.1',
      tolerance: '5',
    },
    {
      band1: '',
      band2: '',
      band3: '',
      multiplier: '0.01',
      tolerance: '10',
    },
  ];

  const fourBandArr = [
    {
      band1: '0',
      band2: '0',
      multiplier: '1',
      tolerance: ' ',
    },
    {
      band1: '10',
      band2: '1',
      multiplier: '10',
      tolerance: '1',
    },
    {
      band1: '20',
      band2: '2',
      multiplier: '100',
      tolerance: '2',
    },
    {
      band1: '30',
      band2: '3',
      multiplier: '1k',
      tolerance: ' ',
    },
    {
      band1: '40',
      band2: '4',
      multiplier: '10k',
      tolerance: ' ',
    },
    {
      band1: '50',
      band2: '5',
      multiplier: '100k',
      tolerance: '0.5',
    },
    {
      band1: '60',
      band2: '6',
      multiplier: '1M',
      tolerance: '0.25',
    },
    {
      band1: '70',
      band2: '7',
      multiplier: '10M',
      tolerance: '0.10',
    },
    {
      band1: '80',
      band2: '8',
      multiplier: ' ',
      tolerance: '0.05',
    },
    {
      band1: '90',
      band2: '9',
      multiplier: ' ',
      tolerance: ' ',
    },
    {
      band1: '',
      band2: '',
      multiplier: '0.1',
      tolerance: '5',
    },
    {
      band1: '',
      band2: '',
      multiplier: '0.01',
      tolerance: '10',
    },
  ];
  
  const handleBand1Select = (value) => {
    if(!isFourBand){
      if (fiveBandArr[value].band1 !== '') {
        setSelectedBand1(value);
      }
    }
    else{
      if (fourBandArr[value].band1 !== '') {
        setSelectedBand1(value);
      }
    }
  };
  
  const handleBand2Select = (value) => {
    if(!isFourBand){
      if (fiveBandArr[value].band2 !== '') {
        setSelectedBand2(value);
      }
    }
    else{
      if (fourBandArr[value].band2 !== '') {
        setSelectedBand2(value);
      }
    }
    
  };
  
  const handleBand3Select = (value) => {
    if (fiveBandArr[value].band3 !== '') {
      setSelectedBand3(value);
    }
  };

  const handleMultiplierSelect = (value) => {
    const multiplierOptions = ["1", "10", "100", "1k", "10k", "100k", "1M", "10M", "0.1", "0.01"];
    if(!isFourBand){
      const selectedMultiplierValue = fiveBandArr[value].multiplier;
      if (multiplierOptions.includes(selectedMultiplierValue)) {
        setSelectedMultiplier(value);
      }
    }
    else{
      const selectedMultiplierValue = fourBandArr[value].multiplier;
      if (multiplierOptions.includes(selectedMultiplierValue)) {
        setSelectedMultiplier(value);
      }
    }
    // console.log(selectedMultiplier)
  };
  
  const handleToleranceSelect = (value,tolvalue) => {
    if (fiveBandArr[value].tolerance !== '' && fiveBandArr[value].tolerance !== ' ') {
      setTolerance(tolvalue)
      setSelectedTolerance(value);
    }
  };

  const toggleBand = () => {
    setIsFourBand(!isFourBand);
    setSelectedBand1(0);
    setSelectedBand2(0);
    setSelectedBand3(0);
    setTolerance(5);
  };

  function formatNumber(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + ' M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + ' k';
    } else {
      const roundedNumber = Math.round(number * 100) / 100; 
      if (Number.isInteger(roundedNumber)) {
        return roundedNumber ;
      } else {
        return roundedNumber.toFixed(2);
      }
    }
  }
  

  function calculateResistance(selectedBand1, selectedBand2, selectedBand3, selectedMultiplier,tolerance) {
    const multiplierValues = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000,0,0, 0.1, 0.01];
    if(!isFourBand)
    { 
      const bandValues = [selectedBand1, selectedBand2, selectedBand3];
      const resistanceValue = (parseFloat(bandValues.join('')) * multiplierValues[selectedMultiplier]);
      let formattedResistance = formatNumber(resistanceValue)
      return ` ${formattedResistance}Ω ` + ` ± ${parseFloat(tolerance)} % `;
    }
    else{
      const bandValues = [selectedBand1, selectedBand2];
      const resistanceValue = (parseInt(bandValues.join('')) * multiplierValues[selectedMultiplier]);
      let formattedResistance = formatNumber(resistanceValue)
      return `${formattedResistance}Ω ` + ` ± ${parseFloat(tolerance)} % `;
    }
  }

  const indBandColors = [
    'black',
    'rgb(153, 117, 82)',
    'rgb(255, 57, 57)',
    'rgb(255, 165, 74)',
    'rgb(255, 255, 122)',
    'rgb(137, 255, 137)',
    'rgb(72, 136, 242)',
    'rgb(240, 144, 246)',
    'rgb(255, 255, 255)',
    'rgb(205, 153, 51)',
    'rgb(204, 204, 204)'
  ];
  
  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{textAlign:'center'}}>Resistor code Calculator</h2>
      </header>
      <div>
      <div className="container">
          <div className="bandContainer">
            <div className="bandSwitch" onClick={toggleBand} style={{cursor:'pointer',userSelect:'none'}}>
              Switch to {!isFourBand ? 'Band 4' : 'Band 5'}
            </div>
            <div className="resistorCalculate" style={isFourBand ? {backgroundColor:'rgb(225, 188, 123)',cursor:'pointer',userSelect:'none'} :{backgroundColor:'rgb(192, 232, 255)',cursor:'pointer',userSelect:'none'}}>
            {calculateResistance(selectedBand1, selectedBand2, selectedBand3, selectedMultiplier,tolerance)}
            </div>
          </div>
          <div className="resistorDaigram">
            <div className="resistorContainer">
              <div className="resistorWire" />
              <div className="resistorBand" style={isFourBand ? {backgroundColor:'rgb(225, 188, 123)',cursor:'pointer',userSelect:'none'} :{backgroundColor:'rgb(192, 232, 255)',cursor:'pointer',userSelect:'none'}}>
                <div className="leftSide" style={{display:'flex',gap:'15px'}}>
                {isFourBand ? (
                    <>
                      <div className="indBand" style={{ backgroundColor: indBandColors[selectedBand1] }}/>
                      <div className="indBand" style={{ backgroundColor: indBandColors[selectedBand2] }}/>
                      <div className="indBand" style={{ backgroundColor: indBandColors[selectedMultiplier] }}/>
                    </>
                  ) : (
                    <>
                      <div className="indBand" style={{ backgroundColor: indBandColors[selectedBand1] }}/>
                      <div className="indBand" style={{ backgroundColor: indBandColors[selectedBand2] }}/>
                      <div className="indBand" style={{ backgroundColor: indBandColors[selectedBand3] }}/>
                      <div className="indBand" style={{ backgroundColor: indBandColors[selectedMultiplier] }}/>
                    </>
                )}
                </div>
                <div className="rightSide">
                  <div className="indBand" style={{ backgroundColor: indBandColors[selectedTolerance] }}/>
                </div>
              </div>
              <div className="resistorWire" />
            </div>
          </div>
          {isFourBand ? (
            <div className="fourBand">
              <div className="bandName bandHeading">
                <div className="bandBox">
                  Band 1
                </div>
                <div className="bandBox">
                  Band 2
                </div>
                <div className="bandBox">
                  {!shouldTruncate ? 'Multiplier' : 'Mult.'}
                </div>
                <div className="bandBox">
                  {!shouldTruncate ? 'Tolerance' : 'Tol.'}
                </div>
              </div>
              {fourBandArr.map((data, index) => (
                <div className="bandNumber" key={index}>
                  <div className="bandBox" onClick={() => handleBand1Select(index)} style={selectedBand1===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'} : {}}>{data.band1==='' ? ` ` : `${index}`}</div>
                  <div className="bandBox" onClick={() => handleBand2Select(index)} style={selectedBand2===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.band2==='' ? ` ` : `${index}`}</div>
                  <div className="bandBox" onClick={() => handleMultiplierSelect(index)} style={selectedMultiplier===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.multiplier!==' ' ? ` ${data.multiplier} Ω`:' '} </div>
                  <div className="bandBox" onClick={() => handleToleranceSelect(index,data.tolerance)} style={selectedTolerance===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.tolerance!==' ' ? `± ${data.tolerance}`:' '}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="fiveBand">
              <div className="bandName bandHeading">
                <div className="bandBox">
                  Band 1
                </div>
                <div className="bandBox">
                  Band 2
                </div>
                <div className="bandBox">
                  Band 3
                </div>
                <div className="bandBox">
                  {!shouldTruncate ? 'Multiplier' : 'Mult.'}
                </div>
                <div className="bandBox">
                  {!shouldTruncate ? 'Tolerance' : 'Tol.'}
                </div>
              </div>
              {fiveBandArr.map((data, index) => (
                <div className="bandNumber" key={index}>
                  <div className="bandBox" onClick={() => handleBand1Select(index)} style={selectedBand1===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.band1==='' ? ` ` : `${index}`}</div>
                  <div className="bandBox" onClick={() => handleBand2Select(index)} style={selectedBand2===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.band2==='' ? ` ` : `${index}`}</div>
                  <div className="bandBox" onClick={() => handleBand3Select(index)} style={selectedBand3===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.band3==='' ? ` ` : `${index}`}</div>
                  <div className="bandBox" onClick={() => handleMultiplierSelect(index)} style={selectedMultiplier===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.multiplier!==' ' ? ` ${data.multiplier} Ω`:' '} </div>
                  <div className="bandBox" onClick={() => handleToleranceSelect(index,data.tolerance)} style={selectedTolerance===index ? index!==9 ? {boxShadow: 'inset 0px 0px 0px 5px white',zIndex:'99'}:{boxShadow: 'inset 0px 0px 0px 5px black',zIndex:'99'}: {}}>{data.tolerance!==' ' ? `± ${data.tolerance}`:' '}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
