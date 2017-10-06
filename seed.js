const pkg = require('./package.json');
const { User, Galleries, Paintings } = require('./server/db/models/index');

const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL ||
  `postgres://localhost:5432/${pkg.name}`);


const users = [
  {name: 'Dali', email: 'artist@art.com', password: 'abc', 
    profileImageUrl: 'https://www.biography.com/.image/c_fit%2Ccs_srgb%2Ch_406%2Cq_50%2Cw_620/MTE5NTU2MzE1OTUxNDk4NzYz/salvador-dali-40389-5-402.jpg', 
    bio: 'Dalí was a skilled draftsman, best known for the striking and bizarre images in his surrealist work. His painterly skills are often attributed to the influence of Renaissance masters.[3][4] His best-known work, The Persistence of Memory, was completed in August 1931. Dalí\'s expansive artistic repertoire included film, sculpture, and photography, in collaboration with a range of artists in a variety of media.', 
    googleId: 'abc', 
    facebookId: 'abc', 
    createdAt: 'now', updatedAt: 'now'},

  {name: 'Pablo Picasso', email: 'artist@art.com', password: 'abc', 
    profileImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Portrait_de_Picasso%2C_1908.jpg/230px-Portrait_de_Picasso%2C_1908.jpg', 
    bio: 'Picasso demonstrated extraordinary artistic talent in his early years, painting in a naturalistic manner through his childhood and adolescence. During the first decade of the 20th century, his style changed as he experimented with different theories, techniques, and ideas. After 1906, the Fauvist work of the slightly older artist Henri Matisse motivated Picasso to explore more radical styles, beginning a fruitful rivalry between the two artists, who subsequently were often paired by critics as the leaders of modern art', 
    googleId: 'abc', 
    facebookId: 'abc', 
    createdAt: 'now', updatedAt: 'now'},

  {name: 'Frida Kahlo', email: 'artist@art.com', password: 'abc', 
    profileImageUrl: '', 
    bio: 'Born to a German father and a mestiza mother, Kahlo spent most of her childhood and adult life at her family home, La Casa Azul, in Coyoacán. She was left disabled by polio as a child, and at the age of eighteen was seriously injured in a traffic accident, which caused her pain and medical problems for the rest of her life. Prior to the accident, she had been a promising student headed for medical school, but in the aftermath had to abandon higher education. Although art had been her hobby throughout her childhood, Kahlo began to entertain the idea of becoming an artist during her long recovery. She was also interested in politics and in 1927 joined the Mexican Communist Party. Through the Party, she met the celebrated muralist Diego Rivera. They were married in 1928, and remained a couple until Kahlo\'s death. The relationship was volatile due to both having extramarital affairs; they divorced in 1939, but remarried the following year.', 
    googleId: 'abc', 
    facebookId: 'abc', 
    createdAt: 'now', updatedAt: 'now'},

  {name: 'Hokusai', email: 'artist@art.com', password: 'abc', 
    profileImageUrl: '', 
    bio: 'abc', 
    googleId: 'abc', 
    facebookId: 'abc', 
    createdAt: 'now', updatedAt: 'now'},

  {name: 'Hokusai', email: 'artist@art.com', password: 'abc', 
    profileImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Hokusai_portrait.png/220px-Hokusai_portrait.png', 
    bio: 'Hokusai created the Thirty-Six Views both as a response to a domestic travel boom and as part of a personal obsession with Mount Fuji.[3] It was this series, specifically The Great Wave print and Fine Wind, Clear Morning, that secured Hokusai’s fame both in Japan and overseas. As historian Richard Lane concludes, Indeed, if there is one work that made Hokusai\'s name, both in Japan and abroad, it must be this monumental print-series. While Hokusais work prior to this series is certainly important, it was not until this series that he gained broad recognition.',
    googleId: 'abc', 
    facebookId: 'abc', 
    createdAt: 'now', updatedAt: 'now'},
];

//USER 1 -DALI  USER 2 - PICASSO  USER 3 -FRIDA KAHLO   USER 4 - HOKUSAI

const paintings = [
  {url: 'http://www.myfreewallpapers.net/artistic/wallpapers/dali-book-transforming-itself-into-a-nude-woman.jpg', 
    createdAt: 'now', updatedAt: 'now', galleryId: '1', userId: '1'},
  {url: 'http://imgsrc.allposters.com/img/print/posters/salvador-dali-dali-montre-molle_a-G-8087738-0.jpg?w=866&h=693', 
    createdAt: 'now', updatedAt: 'now', galleryId: '1', userId: '1'},
  {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqBd5iL5N000RUqseS9gbfDdBby_PJ1GcMMvlvO3HuAmfp5s_', 
    createdAt: 'now', updatedAt: 'now', galleryId: '1', userId: '1'},
  {url: 'https://uploads4.wikiart.org/images/salvador-dali/the-disintegration-of-the-persistence-of-memory.jpg!PinterestSmall.jpg', 
    createdAt: 'now', updatedAt: 'now', galleryId: '1', userId: '1'},
];

const galleries = [
  //Dali galleries
  {title: 'Deserts and Clocks', 
    thumbnailUrl: 'https://news.artnet.com/app/news-upload/2015/06/Napoleons-Nose-Dali.jpg', 
    createdAt: '', updatedAt: '', userId: '1'},
];
