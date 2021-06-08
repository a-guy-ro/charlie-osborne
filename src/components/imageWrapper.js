import React,  {useState, useEffect} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ImageLink from "../components/imageLink.js"

const ImageWrapper = ({image, name, link, xPos, yPos, displayHeightRatio, displayWidthRatio}) => {
const imageWidth = image.childImageSharp.gatsbyImageData.width;
const imageHeight = image.childImageSharp.gatsbyImageData.height;
const [seen, setSeen] = useState(false);
const [igState, setIgState] = useState(true);
const isALink = (name === 'blockbuster' || (link.search('instagram') > 0 && igState === false));
const [imageDisplayProps, setImageDisplayProps] = useState({
    width: imageWidth/displayWidthRatio,
    height: imageHeight/displayHeightRatio,
    top: parseFloat(yPos)*(displayHeightRatio),
    left:parseFloat(xPos)
});

// console.log(imageDisplayProps);
// console.log(displayHeightRatio);
// console.log(displayWidthRatio);

const togglePop = () => {
    setSeen(!seen);
    // console.log(seen);
}

const toggelIG = (currentState) => {
    console.log(currentState);
    setIgState(currentState);
    console.log(igState);
}

useEffect(() => {
    setImageDisplayProps({
    width: imageWidth/displayWidthRatio,
    height: imageHeight/displayHeightRatio,
    top: parseFloat(yPos)*(displayHeightRatio),
    left: parseFloat(xPos)
    })
    console.log(displayHeightRatio);
    console.log(displayWidthRatio);
    // console.log(imageDisplayProps);
    return () => {
    }
}, [displayHeightRatio,displayWidthRatio, imageWidth,imageHeight,xPos,yPos])

return (
        <div  css = {` width: ${imageDisplayProps.width}px;
        height: ${imageDisplayProps.height}px; top: ${imageDisplayProps.top}%;
        left: ${imageDisplayProps.left}%`} id = {image.id} className= {name === 'background' ? 'imageWrapperBG' : name === 'button' ? "imageWrapperLanding" : (isALink && !seen) ? "imageWrapperA" :  (link.length > 1 && !seen) ? "imageWrapperLink" : "imageWrapper"} key={name} onClick = {(link.length > 1 && !seen) ? togglePop : null} onKeyPress = {(link.length > 1 && !seen) ? togglePop : null} >
            {isALink ? <a href = {link} target = '_blank' rel="noreferrer"> <GatsbyImage className = 'gatsbyImages' id = {image.id} key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager' /></a> : 
        <GatsbyImage  className = 'gatsbyImages' key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager'/>}
        {(seen && igState === true) ?  <ImageLink toggleIG = {toggelIG} className = "imageLinks" id = {`popup${name}`} name = {name} link = {link} toggle = {togglePop}/> : null}
        </div>
    )
}

export default ImageWrapper