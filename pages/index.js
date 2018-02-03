import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import to from 'await-to-js';

import craigslist from 'node-craigslist';

export default class App extends React.Component {
  static async getInitialProps({ req }) {
    const client = new craigslist.Client({
      baseHost: 'craigslist.ca',
      city: 'Toronto',
    });

    const [error, response] = await to(client.search('xbox one'));
    response.forEach(listing => console.log(listing));

    return { foo: 'bar' }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Head />
        <h1>TechMaps</h1>
      </div>
    );
  }
}