import React, {useState} from "react"
// import {Text} from "react-native"
import styled from "styled-components"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import InstagramEmbed from 'react-instagram-embed';
import useWindowWidth from './useWindowWidth.js'
import useWindowHeight from './useWindowHeight.js'

const ImageLink = ({name,link,toggle}) => {
const data = useStaticQuery(graphql`
query linkImages {
    allFile(filter: {dir: {eq: "/Users/guyronen/charlie-s_website/src/images/linkImages"}}) {
      nodes {
        childImageSharp {
          gatsbyImageData
        }
        name
        dir
      }
    }
  }  
`)
const statementText_1 = useState (`I admire the theatricality of Crazy Frog’s anthem, the bleakness of Block Buster video store, the violence in The Slits, the nutrition in Monster Munch, the genius in Andrea Arnold, the inventions of Mika Rottenberg, the charm of Cardiff, the fight in 13 year old me, the danger of playing with fireworks, the beauty of rain, the intimacy of public toilets, the magic in Daniel Johnston, the power of swear words, the realness of The Streets, the stories on the 197 bus, the sound of a subwoofer, the colours in Sydenham bingo hall, the comfort of an un-washed tracksuit, the hype for Yung Lean, the higher thinking from Mark Fisher, the textures of faded takeaway signs, the fame for Ninjah, the trickery of Instagram filters, the radical in Pussy Riot, the tenderness of Britney Spears, the swag of Tom Waits, the E numbers in GTA, the absence of Dads.`);
const statementText_2 = useState (`Manifestos written by artists, conjured from Magical Realism. The endless amount of photos on my Dad’s Facebook of witches, ogres, vikings, monsters, celts, spells, rhymes and wizards. The celebration of outsider thinking and the lust for escapism. The never ending class debate, my disagreement with poverty porn and my love for identity exploration. The application of character as an almost filter to frame the ideas within my work. I indulge in archetypes as they live rent free in my brain, on a shelf next to cheap ingredients, found on land, then regurgitated through Charlie Osborne’s hands. If you juxtapose, laugh, rain on my parade or trap me, I probably like you. The internet is a genre and protection can be found in objects, mascots, easter eggs and symbols.`);
const textLines = 18;
const emailText = useState ("EMAIL : charlie_osborne@ymail.com ")
console.log(data);
let artist_statement,etsyBG, etsyLinkImage;
data.allFile.nodes.forEach(image => {
    switch (image.name) {
    case 'artist_statement':
        artist_statement = image.childImageSharp;
    break;
    case 'forsale_bg':
        etsyBG =  image.childImageSharp;
    break;
    case 'forsale_link':
        etsyLinkImage = image.childImageSharp;
    break;
    }
});
const etsyLink = 'https://www.etsy.com/uk/shop/CharlieOsborneShop?ref=simple-shop-header-name&listing_id=1006739510';
console.log(artist_statement);
const windowWidth = useWindowWidth();
const windowHeight = useWindowHeight();
const isInstagram = link.search('instagram') > 0;
const isPlayerVimeo = link.search('player.vimeo') > 0;
const isVimeo = !isPlayerVimeo && link.search('vimeo') > 0;
const isCv = link === 'cv';
const isEtsy = link.search('etsy') > 0;

// const etsyLink = 'https://openapi.etsy.com/v2/users/486267358.js?api_key=1aobxdy0i35wpnog2ni6q3f3';
const igWidth = 320*(windowWidth/1920);
const modalWidth = isInstagram ? (0.45 * (igWidth/320)) : 0.7;
const modalHeight = isCv ? ((windowWidth*modalWidth)/windowHeight) * (artist_statement.gatsbyImageData.height/artist_statement.gatsbyImageData.width) + 0.01:
                    isEtsy ? ((windowWidth*modalWidth)/windowHeight) * (etsyBG.gatsbyImageData.height/etsyBG.gatsbyImageData.width) + 0.01 :
                    isPlayerVimeo ? modalWidth*1.25 : 
                    isInstagram ? 1.75*modalWidth : 0.9;
console.log(data);

    const Container = styled.div `
    .modal {
        position: fixed;
        display: block;
        z-index: 1;
        left: ${100*((1-modalWidth)/2)}%;
        right: ${100*((1-modalWidth)/2)}%;
        top: 5%;
        bottom: 5%;
        width: ${modalWidth * 100}%;
        height: ${isInstagram ? 88 : modalHeight * 100}%;
        justify-content:center;
        overflow: auto;
        
    }
    
    .modalContent {
        background-color: rgba(20,30,30,0.9);
        position: absolute; 
        z-index: inherit;
        width: ${isInstagram ? 98 : 99}%; 
        height: ${isInstagram ? modalHeight : 98}%;
        border: 3px solid blue;
        border-radius: 10px;
        justify-content:center;
    }
    
    .modalPlayer {
        position: absolute;
        display: block;
        z-index: inherit:
        height: 100%;
        width: 100%;
        
    }
    .modalPlayerIG {
        position:absolute;
        top: 0;
        

    }

    .modalPlayerImage {
        position: absolute;
        display: block;
        z-index: inherit:    
    }
   
    .etsyLinkWrapper {
        position:absolute;
        top: 48%;
        left: 40%;
        width: 30%;
        height: 30%;
        &: hover{
            cursor: pointer;
            width: 32%;
            height: 32%;
            }
        
    }
    .textBase {
        position: absolute;
        z-index: 2; 
        font-size: 15px;
        top:25%;
        left:7%;
        right:7%;
        height: 75%;
    }
    .textEmail {
        position: absolute;
        text-align: center;
        bottom: 0;
        top:88%;
        left:25%;
        right:25%;
    }

    p {
        font-family: Helvetica, sans-serif;
        color: white;
        font-style: italic;
    }

    span {
    color: lightslategrey;
    float: right; 
    position: absolute;
    top: 5%;
    right: 5%;
    &: hover {
        color: red;
        cursor: pointer;
        }
    }
`   

// console.log (`isIG ${isInstagram} - isPlayerVimeo ${isPlayerVimeo} - isCV ${isCv} - isVimeo ${isVimeo}`);

    const handleClick = () => {
        toggle();
    }
    
    return (
        <Container>
        {isVimeo ?
        null :
        <div className = "modal" >
            <div className = "modalContent">
            {isPlayerVimeo ? 
                <iframe classNme = "modalPlayer" src={link} title = {name}  
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    width='100%'
                    height='100%'
                    allowFullScreen
                    />
                : isInstagram ?
                // <div className = "modalPlayer">
                <InstagramEmbed
                    className = "modalPlayerIG"
                    url={link}
                    clientAccessToken='236071151616094|5dfdd71495f686a7674fdfce2900ee9d'
                    maxWidth={igWidth}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={(error) => {console.error(error)}}
                    />                         
                    // </div>                                                       
                : isCv ?
                <div className = "modalPlayerImage">
                    
                    <GatsbyImage image = {getImage(artist_statement)} alt = "artistStatement" loading = 'eager' />
                    <div className = "textBase">
                        <p className = "textBody" numberOfLines = {textLines}>
                            {statementText_1}
                            <br/>
                            to be continued..
                            <br/><br/>
                            {statementText_2}
                        </p>
                        <div className = "textEmail">
                            <p>{emailText}</p>
                        </div>
                    </div>
                    </div>
                 : isEtsy ? 
                 <div className = "modalPlayerImage">
                     <GatsbyImage image = {getImage(etsyBG)} alt ="etsy background" loading = "eager"/> 
                     <a className = "etsyLinkWrapper" href = {etsyLink} target = "_blank" rel="noreferrer"> 
                     <GatsbyImage image = {getImage(etsyLinkImage)} alt="etsy_link_image" loading = 'eager' />
                     </a>
                     </div>
         :
                <iframe classNme = "modalPlayer" src={link} title = {name}  
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    width='100%'
                    height='100%'
                    allowFullScreen
                    />}
           <span className="close" onClick = {handleClick}>&times;</span>
            </div>
        </div>
}
        </Container>
    )
}
export default ImageLink;
