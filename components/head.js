import React from 'react';
import _Head from 'next/head';

export default class Head extends React.PureComponent {
  render() {
    return (
      <_Head>
        <title>TechMaps</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </_Head>
    );
  }
}
