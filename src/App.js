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
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import useLocalStorageState from './hooks/useLocalStorageState';

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
ChartJS.defaults.color = '#fff';
ChartJS.defaults.elements.point.hitRadius = 15;
ChartJS.defaults.elements.point.hoverRadius = 6;
ChartJS.defaults.scales = {
  y: {
    min:0,
  },
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultSimulationOptions = (simulationKey) => ({
  name: `simulation ${simulationKey}`, 
  initial:1000, 
  exponent:1, 
  monthlyInvestment: 0,
  monthlyFee: 0,
});

const App = () => {
  const [options, setOptions] = useLocalStorageState({
    months: 12,
    simulations: {
      1: defaultSimulationOptions(1),
    },
  }, 'simulationOptions');
  const data = {
    labels: Array(options.months).fill(0).map((__, index) => `month ${index + 1}`),
    datasets: Object.values(options.simulations).map((simulation, simulationIndex) => ({
      label: simulation.name,
      data: Array(options.months).fill(0).map((__, index)=> Array(index).fill(0).reduce((prev,curr) => 
          (prev + simulation.monthlyInvestment)* simulation.exponent - simulation.monthlyFee, 
        simulation.initial)),
      fill: true,
    }))
  }

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme} >
        <CssBaseline />
        <div className='Chart'>
          <Line data={data} />
        </div>
        <SidePanel className='Side' options={options} setOptions={setOptions} defaultSimulationOptions={defaultSimulationOptions} />
      </ThemeProvider>
    </div>
  );
}

export default App;
