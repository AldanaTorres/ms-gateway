import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Empresa from './empresa/empresa';
import Cliente from './empresa/cliente';
import Proveedor from './empresa/proveedor';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}empresa`} component={Empresa} />
      <ErrorBoundaryRoute path={`${match.url}cliente`} component={Cliente} />
      <ErrorBoundaryRoute path={`${match.url}proveedor`} component={Proveedor} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
