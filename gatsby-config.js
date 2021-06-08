module.exports = {
  siteMetadata: {
    title: "Charlie Osborne",
    description: "Charlie Osborne's website - I admire the theatricality of Crazy Frog’s anthem, the bleakness of Block Buster video store, the violence in The Slits, the nutrition in Monster Munch, the genius in Andrea Arnold, the inventions of Mika Rottenberg, the charm of Cardiff, the fight in 13 year old me, the danger of playing with fireworks, the beauty of rain, the intimacy of public toilets, the magic in Daniel Johnston, the power of swear words, the realness of The Streets, the stories on the 197 bus, the sound of a subwoofer, the colours in Sydenham bingo hall, the comfort of an un-washed tracksuit, the hype for Yung Lean, the higher thinking from Mark Fisher, the textures of faded takeaway signs, the fame for Ninjah, the trickery of Instagram filters, the radical in Pussy Riot, the tenderness of Britney Spears, the swag of Tom Waits, the E numbers in GTA, the absence of Dads.",
    siteUrl:"https://charlieosborne.net",
    instagramUserName: "@charlieosborne.xyz",
    email: "charlie_osborne@ymail.com",
    keywords: "artist, sculpture, installation, performance, London, london, UK, United-Kingdom",
  },
  pathPrefix: "/charlie-osborne",
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://charlieosborne.net",
        sitemap: "https://charlieosborne.net/sitemap.xml",
        policy: [{ userAgent: '*', allow: '/' }]
      },
    },
    
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
