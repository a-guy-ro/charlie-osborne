import React,  {useState, useEffect} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ImageLink from "../components/imageLink.js"

const ImageWrapper = ({image, name, link, xPos, yPos, displayHeightRatio, displayWidthRatio}) => {
const imageWidth = image.childImageSharp.gatsbyImageData.width;
const imageHeight = image.childImageSharp.gatsbyImageData.height;
const [seen, setSeen] = useState(false);
const [imageDisplayProps, setImageDisplayProps] = useState({
    width: imageWidth/displayWidthRatio,
    height: imageHeight/displayHeightRatio,
    top: parseFloat(yPos)*(displayHeightRatio),
    left:parseFloat(xPos)
});

const togglePop = () => {
    setSeen(!seen);
    // console.log(seen);
}
useEffect(() => {
    setImageDisplayProps({
    width: imageWidth/displayWidthRatio,
    height: imageHeight/displayHeightRatio,
    top: parseFloat(yPos)*(displayHeightRatio),
    left: parseFloat(xPos)
    })
    return () => {
    }
}, [displayHeightRatio,displayWidthRatio])
useEffect(() => {
    setImageDisplayProps({
    width: imageWidth/displayWidthRatio,
    height: imageHeight/displayHeightRatio,
    top: parseFloat(yPos)*(displayHeightRatio),
    left: parseFloat(xPos)
    })
    return () => {
    }
}, [])
console.log()
    return (
        <div  css = {` width: ${imageDisplayProps.width}px;
        height: ${imageDisplayProps.height}px; top: ${imageDisplayProps.top}%;
        left: ${imageDisplayProps.left}%`} id = {image.id} className= {name === 'background' ? 'imageWrapperBG' : name === 'blockbuster' ? "imageWrapperA" : name === 'button' ? "imageWrapperLanding" : link.length > 1 ? !seen ? "imageWrapperLink" : "imageWrapper" : "imageWrapper"} key={name} onClick = {link.length > 1 ? !seen ? togglePop : null : null}>
            {name === 'blockbuster' ? <a href = {link} target = '_blank' rel="noreferrer"> <GatsbyImage className = 'gatsbyImages' id = {image.id} key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager' /></a> : 
        <GatsbyImage  className = 'gatsbyImages' key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager'/> }
        {seen ? <ImageLink className = "imageLinks" id = {`popup${name}`} name = {name} link = {link} toggle = {togglePop}/> : null} 
        </div>
    )
}

export default ImageWrapper