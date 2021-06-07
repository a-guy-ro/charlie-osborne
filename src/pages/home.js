import React,  {useState,useEffect} from "react"
import { getImage } from "gatsby-plugin-image"
import {graphql, useStaticQuery} from "gatsby"
import images_ref from "../images/images_ref.json"
import ImageWrapper from "../components/imageWrapper.js"
import useWindowWidth from "../components/useWindowWidth.js"
import useWindowHeight from "../components/useWindowHeight.js"
import StyledComponent from "../components/styledComponents.js"


images_ref.sort((a,b) => a.xPos === b.xPos ? a.yPos  - b.yPos : a.xPos - b.xPos);


const HomePage = ()=> {
    const data = useStaticQuery(
        graphql `
        query homePageQuery {
          images: allFile(filter: {relativeDirectory: {in: "homePage"}}) {
            nodes {
              id
              name
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
              
            }
          }
        }
        `
    )
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const images = data.images.nodes;
  let bgImage;
  data.images.nodes.forEach(node => { if(node.name === 'background') {bgImage= getImage(node)}});
  const displayWidthRatio = bgImage.width/windowWidth;
  const [displayHeightRatio, setDisplayHeightRatio] = useState ((bgImage.height/displayWidthRatio)/windowHeight)
  images.sort((a,b)=> b.childImageSharp.gatsbyImageData.width - a.childImageSharp.gatsbyImageData.width);  

useEffect(() => {
    setDisplayHeightRatio((bgImage.height/(displayWidthRatio))/windowHeight);
    return () => {
    }
  }, [])


  return (
      <StyledComponent>
<div  className = 'pageContainer'>
  {
images.map(image=> {
  return (
  images_ref.map(ref=> {
    if (image.name === ref.name) {
          return (
        <ImageWrapper className  = "imageWrapper" key = {image.id} image = {image} name = {ref.name} link = {ref.link} xPos = {ref.xPos} yPos = {ref.yPos} displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
        )
          } else {
            return null
          }
  })
  )
})
}
</div>
</StyledComponent>
  )
}

export default HomePage
