import React from 'react'
import Nav from 'AthenaComponents/Nav'
import PropTypes from 'prop-types'
import fetchGirlsQuery from 'AthenaSchema/fetchGirlsQuery.graphql'
import { graphql } from '@apollo/client'

const gqlProps = {
  options: () => ({
    variables: {
      from: 0, take: 20, offset: 0
    },
    fetchPolicy: 'cache-and-network'
  }),
  props({ data: { categories, girls, loading, fetchMore, variables } }) {
    return {
      categories,
      girls,
      loading,
      loadMore() {
        return fetchMore({
          query: fetchGirlsQuery,
          variables: {
            from: ~~variables.from, take: variables.take, offset: girls.length,
            hideOnly: false
          },
          updateQuery: (pResult, { fetchMoreResult }) => {
            return {
              girls: pResult.girls.concat(fetchMoreResult.girls)
            }
          }
        })
      },
      loadNewCategories(from) {
        return fetchMore({
          query: fetchGirlsQuery,
          variables: {
            from: ~~from, take: variables.take, offset: 0
          },
          updateQuery(pResult, { fetchMoreResult }) {
            return {
              variables: { ...variables, from: ~~from, offset: 20 },
              girls: fetchMoreResult.girls
            }
          }
        })
      }

    }
  }
}

@graphql(fetchGirlsQuery, gqlProps)
class Girls extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  changeCategory = src => {
    if (this.props.loading) {
      return
    }
    this.props.loadNewCategories(src)
  }

  scrollHandle = () => {
    if (this.props.loading) {
      return
    }
    this.props.loadMore()
  }

  render() {
    const { categories } = this.props
    // TODO: add girls
    return (
      <div>
        <Nav categories={categories || []} onChange={this.changeCategory} />
      </div>
    )
  }
}

Girls.propTypes = {
  loading: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.any),
  girls: PropTypes.arrayOf(PropTypes.any),
  loadMore: PropTypes.func,
  loadNewCategories: PropTypes.func
}

export default Girls
