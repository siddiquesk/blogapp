import React from 'react'
import Home from "./Home"
import Trending from "./Trending"
import Devotional from "./Devotional"
import CreatorsHome from './CreatorsHome'
function Wrapper() {
  return (
    <>
      <div>
        <Home />
        <Trending />
        <Devotional />
        <CreatorsHome />
      </div>
    </>
  )
}

export default Wrapper

