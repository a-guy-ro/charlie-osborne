import React,  {useState} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ImageLink from "../components/imageLink.js"
import styled from "styled-components"

const ImageWrapper = ({image, name, link, xPos, yPos, displayHeightRatio, displayWidthRatio}) => {
    // console.log(image);
    
const [seen, setSeen] = useState(false);
const ImageWrapperStyle = styled.div `
    .ImageWrapperBG{
        position: absolute;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)};
        left: ${parseFloat(xPos)};
        right: 0;
        z-index: -1 !important;
        }
    .imageWrapperLink {
        position: absolute;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
        &: hover {
            transformX(-0.1);
            transformY(-0.1);
            width: ${(image.childImageSharp.gatsbyImageData.width)/displayWidthRatio*1.1}px;
            height: ${(image.childImageSharp.gatsbyImageData.height)/displayWidthRatio*1.1}px;
            cursor: pointer;
        }
    }
    .imageWrapperLanding {
        position: absolute;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
        animation:  monitorIn 1.5s ease-in-out;
        &: hover {
            transformX(-${0.1*(image.childImageSharp.gatsbyImageData.width)/displayWidthRatio}px);
            transformY(-${0.1*(image.childImageSharp.gatsbyImageData.height)/displayWidthRatio}px);
            width: ${(image.childImageSharp.gatsbyImageData.width)/displayWidthRatio*1.1}px;
            height: ${(image.childImageSharp.gatsbyImageData.height)/displayWidthRatio*1.1}px;
            cursor: pointer;
        }
    }
     .imageWrapper{
        position: absolute;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
    }
    img {
        display: flex;
        z-index: 0;
        transform: none;
    }
    a {
        position: absolute;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
        &: hover {
            width: ${(image.childImageSharp.gatsbyImageData.width)/displayWidthRatio*1.1}px;
            height: ${(image.childImageSharp.gatsbyImageData.height)/displayWidthRatio*1.1}px;
            cursor: pointer;
        }
    }
    
      @keyframes monitorIn{
        from{
            transform: scale(0,0);
            opacity: 0;
        }
        to{
            
            transform: scale(1,1);
            opacity: 1;
        }
    }
    `
const togglePop = () => {
    setSeen(!seen);
    // console.log(seen);
}

    return (
        <ImageWrapperStyle>
        <div className= {name === 'background' ? 'imageWrapperBG' : name === 'blockbuster' ? "imageWrapperA" : name === 'button' ? "imageWrapperLanding" : link.length > 1 ? !seen ? "imageWrapperLink" : "imageWrapper" : "imageWrapper"} id = {name} key={name} onClick = {link.length > 1 ? !seen ? togglePop : null : null}>
            {name === 'blockbuster' ? <a href = {link} target = '_blank' rel="noreferrer"><GatsbyImage className = 'gatsbyImages' key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager' /></a> : 
        <GatsbyImage className = 'gatsbyImages' key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager'/> }
        {seen ? <ImageLink className = "imageLinks" id = {`popup${name}`} name = {name} link = {link} toggle = {togglePop}/> : null} 
        </div>
        </ImageWrapperStyle>

    )
}

export default ImageWrapper