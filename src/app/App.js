import './App.css';
import {TasksList} from '../features/task/TasksList'
import {GoalsList} from '../features/goal/GoalsList'
import {Nav} from '../app/layout/Nav'
import {Grid,Paper} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <div>
        <Grid container spacing = {3}>
          <Grid item xs = {12}>
            <Nav/>
          </Grid>
          {/* <Grid item xs = {12}>
            <GoalsList/>
          </Grid> */}
            <Grid item xs = {12}>
            <Paper>
              <TasksList/>
            </Paper>
            </Grid>
          
        </Grid>
      </div>
    </div>
  );
}

export default App;
