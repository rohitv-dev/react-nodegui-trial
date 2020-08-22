import {Window, Renderer, View, Text} from '@nodegui/react-nodegui'
import React, {useState, useEffect} from 'react'

import {systemDetails} from './helpers/systemDetails'
import {initialData} from './helpers/initialData'

import {StatsRow} from './components/StatsRow'

const fixedSize = {width: 280, height: 660}

const App = () => {
  const [data, setData] = useState(initialData)
  useEffect(() => {
    const getSystemData = async() => {
      const sysData : any = await systemDetails()
      setData(sysData)
    }
    getSystemData()
  })
  const {ip, osType, arch} = data.staticDetails
  const {cpuUsed, cpuFree} = data.cpuDetails
  const {memFree, memUsed} = data.memoryDetails

  return (
    <Window minSize={fixedSize} maxSize={fixedSize} styleSheet={styleSheet} windowTitle={'System Utility Monitor'}>
      <View id="container">
        <Text id="header">System Utility Monitor</Text>
        <StatsRow>
          <View id="informationContainer" styleSheet={styleSheet}>
            <Text id="headText">System Information</Text>
            <Text id="infoText">{osType}</Text>
            <Text id="infoText">{ip}</Text>
            <Text id="infoText">{arch}</Text>
          </View>
      </StatsRow>
      <StatsRow>
          <View id="informationContainer" styleSheet={styleSheet}>
            <Text id="headText">CPU Information</Text>
            <Text id="infoText">{cpuUsed.label} : {cpuUsed.usage}</Text>
            <Text id="infoText">{cpuFree.label} : {cpuFree.usage}</Text>
          </View>
      </StatsRow>
      <StatsRow>
          <View id="informationContainer" styleSheet={styleSheet}>
            <Text id="headText">Memory Information</Text>
            <Text id="infoText">{memUsed.label} : {memUsed.usage}</Text>
            <Text id="infoText">{memFree.label} : {memFree.usage}</Text>
          </View>
      </StatsRow>
      </View>
    </Window>
  )
}

const styleSheet = `
  #container {
    flex: 1;
    flex-direction: column;
    min-height: '100%';
    height: '100%';
    justify-content: 'space-evenly';
    background-color: #272727;
  }
  #header {
    font-size: 22px;
    padding: 5px 10px 0px 10px;
    color: white;
  }
  #subHeader {
    font-size: 14px;
    padding: 0px 10px 10px 10px;
    color: white;
  }
  #subHeader {
    font-size: 14px;
    padding: 0px 10px 10px 10px;
    color: white;
  }

  #headText {
    margin: 5px 5px 5px 0;
    font-size: 18px;
    color: white;
  }
  #infoText {
    padding: 5px 0 0 5px;
    color: white;
  }
  #informationContainer {
    height: 180;
    width: 230;
    background: #111111;
    border-radius: 5px;
  }
`

Renderer.render(<App />)