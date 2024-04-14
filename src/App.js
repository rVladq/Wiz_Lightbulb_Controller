import React from 'react';
import './style.css'

import Lamp from './components/Lamp'
import ControlMenu from './components/ControlMenu'

export default function App() {

    const [intensity, setIntensity] = React.useState(100);
    const [color, setColor] = React.useState('');

    return (
    <div className="App">
        <div className="home">
            <ControlMenu intensity={intensity} setIntensity={setIntensity} color={color} setColor={setColor} />
            <Lamp intensity={intensity} color={color} />
        </div>
    </div>
  );
  
}
