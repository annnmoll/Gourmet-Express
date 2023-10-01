import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
      <footer
  className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
  <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
    
    <Link
      className="text-neutral-800 dark:text-neutral-400 cursor-pointer"
      to="/"
      >©GoFood 2023,Inc
    </Link>
  </div>
</footer>
    </div>
  )
}

export default Footer