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
  const bgImage = getImage(data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'background')]);
  const widthRatio = bgImage.width !== Infinity ? bgImage.width : 1919;
  const heightRatio = bgImage.height !== Infinity ? bgImage.height : 1079;
  const [displayWidthRatio, setDisplayWidthRatio] = useState(widthRatio/1024);
  const [displayHeightRatio, setDisplayHeightRatio] = useState ((heightRatio/displayWidthRatio)/768);
  images.sort((a,b)=> b.childImageSharp.gatsbyImageData.width - a.childImageSharp.gatsbyImageData.width);  

  useEffect(() => {
    setDisplayWidthRatio(bgImage.width/displayWidthRatio);
    setDisplayHeightRatio((bgImage.height/(displayWidthRatio))/windowHeight);
    return () => {
    }
  }, [bgImage.height, bgImage.width,windowWidth,windowHeight,displayWidthRatio])
  console.log(widthRatio);
  console.log(heightRatio);


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
