import { IonApp, setupIonicReact } from '@ionic/react';
import { AppContextProvider } from "./State";
import { Home } from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
	<AppContextProvider>
		<IonApp>
 			<Home />
		</IonApp>
	</AppContextProvider>
);

export default App;
