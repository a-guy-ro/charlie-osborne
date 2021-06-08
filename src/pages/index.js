import React,  {useState,useEffect} from "react"
import { getImage } from "gatsby-plugin-image"
import {graphql, useStaticQuery} from "gatsby"
import ImageWrapper from "../components/imageWrapper.js"
import useWindowWidth from "../components/useWindowWidth.js"
import useWindowHeight from "../components/useWindowHeight.js"
import StyledComponent from "../components/styledComponents.js"

const IndexPage = ()=> {
  const data = useStaticQuery(graphql`
  query indexPageQuery {
    images: allFile(filter: {relativeDirectory: {in: "landingPage"}}) {
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
  `)

  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();


  const bgImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'background')];
  const buttonImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'button')];
  const textImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'STEAL_COIN_TO_BEGIN')];
  const gatsbyBgImage = getImage(bgImage);
  const displayWidthRatio = gatsbyBgImage.width/windowWidth !== Infinity ? gatsbyBgImage.width/windowWidth : 1;
  const [displayHeightRatio, setDisplayHeightRatio] = useState ((gatsbyBgImage.height/displayWidthRatio)/windowHeight!==Infinity?(gatsbyBgImage.height/displayWidthRatio)/windowHeight:1);
  
  useEffect(() => {
    // console.log('use effect is working!');
    setDisplayHeightRatio((gatsbyBgImage.height/(displayWidthRatio))/windowHeight);
    return () => {
    }
  }, [gatsbyBgImage.height,displayWidthRatio,windowHeight,windowWidth])


  return (
    <StyledComponent>
<div  className = 'pageContainer' >
   <ImageWrapper key = "background" image = {bgImage}  name = "background" link = "-" xPos = "0" yPos = "0" displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   <ImageWrapper key = "text" image = {textImage} name = "text" link = "-" xPos = "38.9" yPos = "69" 
   displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   <a href = "/home"> 
   <ImageWrapper className = 'imageWrapperLink' key = "button" image = {buttonImage} name = "button" link = "-" xPos = "31.5" yPos = "10" displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   </a>
</div>
</StyledComponent>
  )
}

export default IndexPage
