import styles from './App.module.css';

import AppHeader from './components/AppHeader';
import Toolbar from './components/Toolbar';
import Container from './components/Container';
import TaskList from './components/TaskList';
import AppFooter from './components/AppFooter';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <AppHeader />
        <Toolbar />
        <Container>
          <TaskList />
        </Container>
        <AppFooter />
      </div>
    </div>
  );
}

export default App;
