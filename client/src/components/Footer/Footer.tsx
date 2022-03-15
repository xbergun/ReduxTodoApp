import React from "react"

const Footer = () => {
  return (
    <footer className="info">
	<p>Click to edit a todo</p>
	<p>Created by <a href="https://github.com/berkayergun16">Berkay Ergun</a></p>
</footer>
  )
}

export default React.memo(Footer)