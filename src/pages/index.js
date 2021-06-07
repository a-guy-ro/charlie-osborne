import React,  {useState,useEffect} from "react"
import { getImage } from "gatsby-plugin-image"
import {graphql} from "gatsby"
import ImageWrapper from "../components/imageWrapper.js"
import useWindowWidth from "../components/useWindowWidth.js"
import useWindowHeight from "../components/useWindowHeight.js"
import styled from "styled-components"

// import { GatsbyImage } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser"


// images_ref.sort((a,b) => a.xPos === b.xPos ? a.yPos  - b.yPos : a.xPos - b.xPos);


const IndexPage = ({data})=> {

  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  const imageWrapperStyle = styled.div `
  
  .imageWrapperLink: focus, .imageWrapperLink: hover {
    transform: scale(1.2,1.2);
  }
  `

  // const images = data.images.nodes;
  // console.log(images);
  const bgImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'background')];
  const buttonImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'button')];
  const textImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'STEAL_COIN_TO_BEGIN')];
  const gatsbyBgImage = getImage(bgImage) !== null ? getImage(bgImage) : {width: 1024, height: 768};
  const displayWidthRatio = gatsbyBgImage.width/windowWidth;
  const [displayHeightRatio, setDisplayHeightRatio] = useState ((gatsbyBgImage.height/displayWidthRatio)/windowHeight);

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
 overflow:hidden;
 `}>
   <imageWrapperStyle>
   <ImageWrapper key = "background" image = {bgImage} name = "background" link = "-" xPos = "0" yPos = "0" displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   
   <ImageWrapper key = "text" image = {textImage} name = "text" link = "-" xPos = "38.9" yPos = "79" 
   displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   <a href = "/home">
   <ImageWrapper className = 'imageWrapperLink' key = "button" image = {buttonImage} name = "button" link = "-" xPos = "31.5" yPos = "17" displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
   </a>
   </imageWrapperStyle>
  {
// images.map(image=> {
//   return (
//   <ImageWrapper key = {image.id} image = {image} name = {image.name} link = {image.name === 'button' ? './home.js' : '-'} xPos = {image.name === 'background' ? 0 : image.name === 'button' ? 31.5 : 38.9} yPos = {image.name === 'background' ? 0 : image.name === 'button' ? 17 : 79} displayHeightRatio = {displayHeightRatio} displayWidthRatio = {displayWidthRatio}/>
//   )
// })
}
{/* <GatsbyImage className = "bgImage" image = {getImage(bgImage.childImageSharp)} alt ="bgImage"/>
<GatsbyImage className = "textImage" image = {getImage(textImage.childImageSharp)} alt = "textImage"/> */}
{/* <GatsbyImage className = "buttonImage" image = {getImage(buttonImage.childImageSharp)} alt = "buttonImage"/> */}
</div>
  )
}

export default IndexPage

export const pageQuery = graphql `
query indexPageQuery {
  images: allFile(filter: {dir: {eq: "/Users/guyronen/charlie-s_website/src/images/landingPage"}}) {
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
