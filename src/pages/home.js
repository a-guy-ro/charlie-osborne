import React,  {useState,useEffect} from "react"
import { getImage } from "gatsby-plugin-image"
import {graphql, useStaticQuery} from "gatsby"
import images_ref from "../images/images_ref.json"
import ImageWrapper from "../components/imageWrapper.js"
import useWindowWidth from "../components/useWindowWidth.js"
import useWindowHeight from "../components/useWindowHeight.js"
import StyledComponent from "../components/styledComponents.js"
import Seo from "../components/seo.js"


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
  const bgImage = data.images.nodes[data.images.nodes.findIndex(node=>node.name === 'background')];
  const gatsbyBgImage = getImage(bgImage);
  const widthRatio = gatsbyBgImage.width !== Infinity ? gatsbyBgImage.width : 3386;
  const heightRatio = gatsbyBgImage.height !== Infinity ? gatsbyBgImage.height : 2102;
  const [displayWidthRatio, setDisplayWidthRatio] = useState(widthRatio/1024);
  const [displayHeightRatio, setDisplayHeightRatio] = useState ((heightRatio/displayWidthRatio)/768);
  images.sort((a,b)=> b.childImageSharp.gatsbyImageData.width - a.childImageSharp.gatsbyImageData.width);  

  useEffect(() => {
    // console.log('use effect is working!');
    setDisplayWidthRatio(gatsbyBgImage.width/windowWidth);
    setDisplayHeightRatio((gatsbyBgImage.height/(displayWidthRatio))/windowHeight);
    return () => {
    }
  }, [gatsbyBgImage.height,displayWidthRatio,windowHeight,windowWidth])
  console.log(widthRatio);
  console.log(heightRatio);


  return (
      <StyledComponent>
        <Seo/>
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
