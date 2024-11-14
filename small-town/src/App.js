import './App.css';
import Village from './Village'
import Villager from './Villager';

export default function App() {
  return (
    <main>
      <header>
        <Village villageName={"NameTest"}/>
      </header>
      <body>
        <Villager />
      </body>
    </main>
  );
}