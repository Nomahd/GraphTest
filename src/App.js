import React, {useEffect, useState} from 'react';
import {BarChart, MODE, DATATYPE} from "datavehicle-graph-new";
import "./App.scss"
import Dialog from "@material-ui/core/Dialog";

const App = () => {
  const [dataType, setDataType] = useState(DATATYPE.crude);
  const [data, setData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectData, setSelectData] = useState(DATA.posData);

  const loadData = async event => {
    if (event === null) {
      const response = await fetch(`/data/${selectData}.json`);
      setData(await response.json())
    }
    else {
      setSelectData(event.target.value);
      const response = await fetch(`./data/${event.target.value}.json`);
      setData(await response.json())
    }
  };

  useEffect(
      () => {
        loadData(null)
      }, []
  );

  const openGraph = () => {
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const createSmallGraphs = () => {
    let array = [];
    for (let i = 0 ; i < 1 ; i++) {
      array.push((<div onClick={openGraph}>
        <BarChart className="small" data={data} dataType={dataType} mode={MODE.small} redraw={true} />
      </div>))
    }
    return array
  };
  return (
      <div className="App">
        <header>
          <h1>DataVehicle Graph Library Test</h1>
        </header>
        <div className="Main">
          <div className="toolbar">
            <select value={selectData} onChange={loadData}>
              <option value="posData">Positive Data</option>
              <option value="negData">Negative Data</option>
              <option value="mixData">Mixed Data</option>
            </select>
          </div>
          <div className="Container">
            <div className="small-charts">
              {data && dataType && createSmallGraphs()}
            </div>
            {
              dialogOpen && <Dialog
                  open={dialogOpen}
                  onClose={closeDialog}
                  maxWidth='xl'
              >
                <div className="toolbar-content">
                  <button onClick={() => setDataType(DATATYPE.crude)}>
                    Crude
                  </button>
                  <button onClick={() => setDataType(DATATYPE.adjst)}>
                    Adjust
                  </button>
                </div>
                <BarChart width={1600} height={900} data={data} dataType={dataType} mode={MODE.normal}/>

              </Dialog>
            }
          </div>
        </div>
      </div>
  );
};

const DATA = {
  posData: 'posData',
  negData: 'negData',
  mixData: 'mixData'
};

export default App;
