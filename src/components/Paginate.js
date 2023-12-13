import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = (props) => {

    let isAdmin = false
    isAdmin = props.isAdmin
    let keyword = props.keyword ? props.keyword : ''
    let page = props.page;
    let pages = props.pages;
  return (
    pages > 1 && (
      <Pagination>      
        {[...Array(pages).keys()].map((x) => ( //Array contructor here and i pass pages
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ?keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
