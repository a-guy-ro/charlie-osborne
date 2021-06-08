import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ title, description, article }) => {
    const { pathname } = useLocation()
    const { site } = useStaticQuery(query)

    const {
        defaultTitle,
        defaultDescription,
        siteUrl,
        instagramUsername,
        email,
        keywords,
      } = site.siteMetadata

      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        url: `${siteUrl}${pathname}`,
      }
     
    return (
        <Helmet title={seo.title}>
            <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {keywords && <meta name="keywords" content={keywords}/>}
      {email && <meta name="email" content={email}/>}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {instagramUsername && (
        <meta name="instagram:creator" content={instagramUsername} />
      )}
      {seo.title && <meta name="instagram:title" content={seo.title} />}
      {seo.description && (
        <meta name="instagram:description" content={seo.description} />
      )}
    </Helmet>
    )
  }

export default Seo

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: siteUrl
        instagramUserName
        email
        keywords
      }
    }
  } `

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  article: PropTypes.bool,
}
Seo.defaultProps = {
  title: null,
  description: null,
  article: false,
}