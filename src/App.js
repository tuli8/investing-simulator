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

ChartJS.defaults.backgroundColor = '#9BD0F530';
ChartJS.defaults.borderColor = '#36A2EB';
ChartJS.defaults.color = '#fff';
ChartJS.defaults.elements.point.hitRadius = 15;
ChartJS.defaults.elements.point.hoverRadius = 6;
ChartJS.defaults.scales = {
  y: {
    min:0,
  },
};

const OVERALL_INVESTMENT_GRAPH_BORDER_COLOR = '#36A23B';
const OVERALL_INVESTMENT_GRAPH_BACKGROUND_COLOR = '#9BD06530';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const simulationFields = [
  {
      title: 'name',
      optionsKey: 'name',
      type: 'text',
      default: simulationKey =>  `simulation ${simulationKey}`,
  },
  {
      title: 'yield',
      optionsKey: 'exponent',
      type: 'yield',
      default: 1,
  },
  {
      title: 'initial value',
      optionsKey: 'initial',
      type: 'number',
      default: 1000,
  },
  {
      title: 'monthly investment',
      optionsKey: 'monthlyInvestment',
      type: 'number',
      default: 0,
  },
  {
      title: 'monthly fee',
      optionsKey: 'monthlyFee',
      type: 'number',
      default: 0,
  },
  {
    title: 'buying/selling fees',
    optionsKey: 'buySellFee',
    type: 'percentageWithMinimum',
    default: {
      percentage: 0,
      minimum: 0,
    },
  },
  {
    title: 'show overall investment',
    optionsKey: 'showInvestment',
    type: 'boolean',
    default: false,
  },
  {
    title: 'show withdraw amount',
    optionsKey: 'showWithdraw',
    type: 'boolean',
    default: false,
  }
];

const defaultSimulationOptions = (simulationKey) => 
  simulationFields
    .map(field => ({
      key: field.optionsKey,
      value: (typeof field.default === 'function') ? field.default(simulationKey) : field.default,
    }))
    .reduce((prev, curr) => ({...prev, [curr.key]: curr.value}), {});

const createSimulationData = (months, simulation) => {
  const dataPoints = [simulation.initial];

  for (let i = 1; i< months; i++) {
    const previusMonth = dataPoints[i - 1];
    const monthlyAddedValue = simulation.monthlyInvestment - simulation.monthlyFee;
    const buyingFee = Math.max(simulation.buySellFee.percentage * monthlyAddedValue, monthlyAddedValue === 0 ? 0 : simulation.buySellFee.minimum);
    const monthlyAddedValueAfterFees = monthlyAddedValue - buyingFee;
    dataPoints.push((previusMonth + monthlyAddedValueAfterFees) * simulation.exponent);
  }

  return dataPoints;
}

const createOverallInvestmentSimulationData = (months, simulation) => (
  createSimulationData(months, {...simulation, monthlyFee: 0, buySellFee: {percentage: 0, minimum: 0}, exponent: 1})
)

const createSimulationGraphs = (months, simulation) => {
  const simulations = [{
    label: simulation.name,
    data: createSimulationData(months, simulation),
    fill: true,
  }];
  
  if (simulation.showInvestment) {
    simulations.push({
      label: `${simulation.name} - overall investments`,
      data: createOverallInvestmentSimulationData(months, simulation),
      fill: true,
      borderColor: OVERALL_INVESTMENT_GRAPH_BORDER_COLOR,
      backgroundColor: OVERALL_INVESTMENT_GRAPH_BACKGROUND_COLOR,
    })
  }

  return simulations;
}

const App = () => {
  const [options, setOptions] = useLocalStorageState({
    months: 12,
    simulations: {
      1: defaultSimulationOptions(1),
    },
  }, 'simulationOptions');
  
  const simulatedMonths = options.months + 1;

  const data = {
    labels: Array(simulatedMonths).fill(0).map((__, index) => `month ${index + 1}`),
    datasets: Object.values(options.simulations).map((simulation, simulationIndex) => createSimulationGraphs(simulatedMonths, simulation))
      .reduce((prev, curr) => [...prev, ...curr], []),
  }

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme} >
        <CssBaseline />
        <div className='Chart'>
          <Line data={data} />
        </div>
        <SidePanel className='Side' options={options} setOptions={setOptions} defaultSimulationOptions={defaultSimulationOptions} simulationFields={simulationFields}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
