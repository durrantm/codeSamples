import { StrictMode } from 'react';
import './App.sass';
import { Switch, Route } from 'react-router-dom';
import APIErrorProvider from './providers/APIErrorProvider';
import WalletAndPricesProvider from './providers/WalletAndPricesProvider';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Executions from './pages/Executions';
import Errors from './components/Errors';
import Error404 from './pages/404';
import Orders from './pages/Orders';
import PageSettingsProvider from './providers/PageSettingsProvider';
import TradeProvider from './providers/TradeProvider';
import PriceTicker from './components/PriceTicker';
import Title from './components/Title';
import Trading from './pages/Trading';

function App() {
  return (
    <StrictMode>
      <WalletAndPricesProvider>
        <APIErrorProvider>
          <div className="App">
            <header>
              <PriceTicker />
              <Title />
              <Navigation />
              <Errors />
            </header>
            <main>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/executions">
                  <PageSettingsProvider tradeType="execution">
                    <Executions />
                  </PageSettingsProvider>
                </Route>
                <Route path="/orders">
                  <PageSettingsProvider tradeType="order">
                    <Orders />
                  </PageSettingsProvider>
                </Route>
                <Route path="/trading">
                  <TradeProvider>
                    <Trading />
                  </TradeProvider>
                </Route>
                <Route>
                  <Error404 />
                </Route>
              </Switch>
            </main>
          </div>
        </APIErrorProvider>
      </WalletAndPricesProvider>
    </StrictMode>
  );
}
export default App;
