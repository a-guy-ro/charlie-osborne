import React,  {useState,useEffect} from "react"
import { getImage } from "gatsby-plugin-image"
import {graphql, useStaticQuery} from "gatsby"
import ImageWrapper from "../components/imageWrapper.js"
import useWindowWidth from "../components/useWindowWidth.js"
import useWindowHeight from "../components/useWindowHeight.js"
// import styled from "styled-components"

// import { GatsbyImage } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser"


// images_ref.sort((a,b) => a.xPos === b.xPos ? a.yPos  - b.yPos : a.xPos - b.xPos);


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

  // const ImageWrapperStyle = styled.div `
  
  // .imageWrapperLink: focus, .imageWrapperLink: hover {
  //   transform: scale(1.2,1.2);
  // }
  // `

  // const images = data.images.nodes;
  // console.log(images);
  const bgImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'background')];
  const buttonImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'button')];
  const textImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'STEAL_COIN_TO_BEGIN')];
  const gatsbyBgImage = getImage(bgImage);
  // const gatsbyBgImage = {width: 1919, height: 1079};
  const displayWidthRatio = gatsbyBgImage.width/windowWidth;
  const [displayHeightRatio, setDisplayHeightRatio] = useState ((gatsbyBgImage.height/displayWidthRatio)/windowHeight);
  console.log(buttonImage);

  useEffect(() => {
    console.log('use effect is working!');
    setDisplayHeightRatio((gatsbyBgImage.height/(displayWidthRatio))/windowHeight);
    return () => {
    }
  }, [windowHeight, gatsbyBgImage, displayWidthRatio, windowWidth,displayHeightRatio])


  return (
<div  css={`background-color:black;
position: absolute;
 width:100%; 
 height:100%;
 top:0;
 lef:0;
 right:0;
 z-index:-2;
 overflow:hidden;
 `}>
   <ImageWrapper key = "background" image = {getImage(bgImage)} width = {bgImage.childImageSharp.gatsbyImageData.width} height = {bgImage.childImageSharp.gatsbyImageData.height} name = "background" link = "-" xPos = "0" yPos = "0" displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   
   <ImageWrapper key = "text" image = {getImage(textImage)} width = {textImage.childImageSharp.gatsbyImageData.width} height = {textImage.childImageSharp.gatsbyImageData.height} name = "text" link = "-" xPos = "38.9" yPos = "69" 
   displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   <a href = "/home"> 
   <ImageWrapper className = 'imageWrapperLink' key = "button" image = {getImage(buttonImage)} width = {buttonImage.childImageSharp.gatsbyImageData.width} height = {buttonImage.childImageSharp.gatsbyImageData.height} name = "button" link = "-" xPos = "31.5" yPos = "10" displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   </a>
</div>
  )
}

export default IndexPage
