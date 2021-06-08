import styled from "styled-components"
 
// const StyledComponent = ({children}) => {
const StyledComponent = styled.div `
.pageContainer {
    background-color:black;
    position: absolute;
 width:100%; 
 height:100%;
 top:0;
 lef:0;
 right:0;
 z-index:-2;
 overflow:hidden;

 .pageContainer,.imageWrapperBG {
    position: absolute;
    display: inline-block;
    right: 0;
   
}
.imageWrapperBG > div {
    z-index: -1 !important;
}

.pageContainer, .imageWrapperLink {
    position: absolute;
    display: inline-block;
    z-index: 0;
    &: hover {
        transform: scale(1.15,1.15);
        cursor: pointer;
    }
    
}
.pageContainer, .imageWrapperA {
    position: absolute;
    margin: none;
    display: inline-block;
    z-index: 0;
    a {
        position: absolute;
        &: hover {
            z-index: 1;
            transform: scale(1.15,1.15);
            cursor: pointer;
        }
        
    }
    
}
.imageWrapper{
    position: absolute;
    display: inline-block;
    a {
        position: absolute;
        &: hover {
            z-index: 1;
            transform: scale(1.15,1.15);
            cursor: pointer;
        }
        
    }
   
}


.pageContainer, .imageWrapperLanding {
    position: absolute;
    display: inline-block;
    animation:  monitorIn 1.5s ease-in-out;
    z-index: 0;
    &: hover {
        z-index: 1;
        transform: scale(1.15,1.15);
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

.modalContainer {
    position: fixed;
    z-index: 2;
}

.modal {
    position: fixed;
    display: block;
    z-index: 2 !important;
    top: 5%;
    bottom: 5%;
    justify-content:center;
    overflow: auto;
}

.modalContent {
    background-color: rgba(20,30,30,0.9);
    position: absolute; 
    display:inline-block;
    z-index: 2 !important;
    border: 3px solid blue;
    border-radius: 10px;
    justify-content:center;

    
}
.modalPlayer {
    position: absolute;
    display: block;
    z-index: inherit;
    height: 100%;
    width: 100%;
    
}
.modalPlayerIG {
    position:absolute;
    top: 0;
}

.modalPlayerImage {
    position: absolute;
    background-color: rgba(0,0,0,0.9);
    display: inline-block; 
    z-index: inherit !important; 
    height: 100%;
    width: 100%;
}

.etsyLinkWrapper {
    position:absolute;
    top: 48%;
    left: 40%;
    width: 30%;
    height: 30%;
    &: hover{
        cursor: pointer;
        translation: scale (1.15,1.15);
        }
    
}
.textBase {
    position: absolute;
    disply: block;
    height:78%;
    top: 22%;
    left:7%;
    right:7%;
    overflow: auto;
}
.textEmail {
    font-size: 105%;
    position: absolute;
    display: block;
    text-align: center;
    left:25%;
    right:25%;
}

p {
    font-family: Helvetica, sans-serif;
    font-size: 90%;
    color: white;
    font-style: italic;
}

span {
color: lightslategrey;
float: right; 
z-index: 2 !important;
position: absolute;
top: 5%;
right: 5%;
&: hover {
    color: red;
    cursor: pointer;
    }
}

}
.imageWrapper img {
    z-index: 0;
}
`
   
// }

export default StyledComponent