import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import to from 'await-to-js';
import fetch from 'node-fetch';

import craigslist from 'node-craigslist';

export default class App extends React.Component {
  static async getInitialProps({ req }) {
    const client = new craigslist.Client({
      baseHost: 'craigslist.ca',
      city: 'sfbay',
    });
    const options = { category: 'apa', maxAsk: '3000', minAsk: '1000' };
    const [error, listings] = await to(client.search(options, 'mission'));
    let latlngs = {};
    
    const [errors, results] = await to(Promise.all([
      ...listings
        .filter(listing => listing.location)
        .map(async listing => {
          if (latlngs[listing.location]) {
            listing.latlng = latlngs[listing.location];
            return listing;
          }
          const url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + listing.location;
          const response = await fetch(url);
          const responseBody = await response.json();
          if (responseBody.results[0] && responseBody.results[0].geometry) {
            listing.latlng = responseBody.results[0].geometry.location;
            latlngs[listing.location] = listing.latlng;
          } 
          return listing;
        })
    ]));

    return results;
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <Head />
        <h1>TechMaps</h1>
      </div>
    );
  }
}