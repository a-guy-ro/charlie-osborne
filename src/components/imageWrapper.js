import React,  {useState} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ImageLink from "../components/imageLink.js"
import styled from "styled-components"

const ImageWrapper = ({image, name, link, xPos, yPos, displayHeightRatio, displayWidthRatio}) => {
    // console.log(image);
    
const [seen, setSeen] = useState(false);
const ImageWrapperStyle = styled.div `
    .imageWrapperBG{
        position: absolute;
        display: flex;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)};
        left: ${parseFloat(xPos)};
        right: 0;
       
    }
    .imageWrapperBG , div {
        z-index: -1 !important;
    }
    
    .imageWrapperLink {
        position: absolute;
        display: flex;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
        z-index: 0;
        &: hover {
            transform: scale(1.15,1.15);
            cursor: pointer;
        }
    }
    .imageWrapperLink , div {
        z-index: 0;
    }
    .imageWrapperLanding {
        position: absolute;
        display: flex;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
        animation:  monitorIn 1.5s ease-in-out;
        z-index: 0 !important;
        &: hover {
            transform: scale(1.15,1.15);
            cursor: pointer;
        }
    }
    .imageWrapperLanding , div {
        z-index: 0;
    }
     .imageWrapper{
        position: absolute;
        display: flex;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
        z-index: 0 !important;
       
    }
    .imageWrapper , div {
        z-index: 0;
    }
    a {
        position: absolute;
        width: ${(image.childImageSharp.gatsbyImageData.width/displayWidthRatio)}px;
        height: ${(image.childImageSharp.gatsbyImageData.height/displayWidthRatio)}px;
        top: ${parseFloat(yPos)*(displayHeightRatio)}%;
        left: ${parseFloat(xPos)}%;
        z-index: 0;
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
        <ImageWrapperStyle >
        <div className= {name === 'background' ? 'imageWrapperBG' : name === 'blockbuster' ? "imageWrapperA" : name === 'button' ? "imageWrapperLanding" : link.length > 1 ? !seen ? "imageWrapperLink" : "imageWrapper" : "imageWrapper"} id = {name} key={name} onClick = {link.length > 1 ? !seen ? togglePop : null : null}>
            {name === 'blockbuster' ? <a href = {link} target = '_blank' rel="noreferrer"><GatsbyImage className = 'gatsbyImages' key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager' /></a> : 
        <GatsbyImage className = 'gatsbyImages' key = {image.id} image = {getImage(image.childImageSharp)} alt = {name} loading = 'eager'/> }
        {seen ? <ImageLink className = "imageLinks" id = {`popup${name}`} name = {name} link = {link} toggle = {togglePop}/> : null} 
        </div>
        </ImageWrapperStyle>

    )
}

export default ImageWrapper