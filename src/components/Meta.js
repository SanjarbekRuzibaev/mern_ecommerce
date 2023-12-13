import React from 'react'
import { Helmet } from 'react-helmet'

//act as a wrapper
const Meta = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name='description' content={props.description} />
      <meta name='keyword' content={props.keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To World Brands',
  description: 'We sell the best products for cheap',
  keywords: 'dresses, eccomerce project',
}

export default Meta
