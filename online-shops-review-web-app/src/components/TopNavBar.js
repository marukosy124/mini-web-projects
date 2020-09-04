import React from 'react'
import {
  Link
} from "react-router-dom";
import { Menu, Sticky } from 'semantic-ui-react'

export default function App() {
  return (
      <Sticky >
        <Menu attached='top' secondary widths={3}>
          <Link to="/" class="item">Home</Link>
          <Link to="/about" class="item">About</Link>
          <Link to="/shops" class="item">Shops</Link>
        </Menu>
      </Sticky>
  )
}

