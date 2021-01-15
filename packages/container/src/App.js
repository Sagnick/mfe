import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy( () => import( './components/MarketingApp' ) );
const AuthLazy = lazy( () => import( './components/AuthApp' ) );

const generateClassName = createGenerateClassName( {
  productionPrefix: 'container',
} );

export default () => {
  const [ isSignedIn, setSignedIn ] = useState( false );

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={ generateClassName }>
        <div>
          <Header isSignedIn={ isSignedIn } onSignOut={ () => setSignedIn( false ) } />
          <Suspense fallback={ <Progress /> }>
            <Switch>
              <Route path="/auth" >
                <AuthLazy onSignIn={ () => { setSignedIn( true ) } } />
              </Route>
              <Route path="/" component={ MarketingLazy } />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
