import React from 'react';
import { Spinner as ReactstrapSpinner } from 'reactstrap';
import { withTheme } from 'styled-components';

const Spinner: React.FC<any> = ({ theme }) => (
  <ReactstrapSpinner style={{ color: theme.primary }} />
);

export default withTheme(Spinner);
