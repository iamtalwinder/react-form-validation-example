import { Box } from '@mui/material';
import TodoForm from './TodoForm';
import createMockServer from './mock-server';

createMockServer();

function App() {
  return <Box sx={{ maxWidth: 500, margin: 'auto' }}><TodoForm /></Box>;
}

export default App;
