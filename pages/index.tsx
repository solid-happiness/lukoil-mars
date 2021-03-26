import 'fontsource-roboto';
import 'tippy.js/dist/tippy.css';

import React from 'react';

import { Layout } from 'client/components/Layout';
import { Home } from 'client/components/Home';

const Index: React.FC = () => (
  <Layout>
    <Home />
  </Layout>
);

export default Index;
