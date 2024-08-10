import './App.css';
import SidePanel from './modules/SidePanel';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

ChartJS.defaults.backgroundColor = '#9BD0F550';
ChartJS.defaults.borderColor = '#36A2EB';
ChartJS.defaults.color = getComputedStyle(document.body).getPropertyValue('--text-color');
ChartJS.defaults.elements.point.hitRadius = 15;
ChartJS.defaults.elements.point.hoverRadius = 6;
ChartJS.defaults.scales = {
  y: {
    min:0,
  },
};

function App() {
  const [options, setOptions] = useState({
    months: 12,
    simulations: {
      1: {
        exponent: 1.5,
        initial: 1000,
      },
    },
  });
  const data = {
    labels: Array(options.months).fill(0).map((__, index) => `month ${index + 1}`),
    datasets: Object.values(options.simulations).map((simulation, simulationIndex) => ({
      label: `Simulation ${simulationIndex + 1}`,
      data: Array(options.months).fill(0).map((__, index)=> simulation.initial * simulation.exponent ** index),
      fill: true,
    }))
  }

  return (
    <div className="App">
      <div className='Chart'>
        <Line data={data} />
      </div>
      <SidePanel className='Side' options={options} setOptions={setOptions} />
    </div>
  );
}

export default App;
