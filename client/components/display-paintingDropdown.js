import React,{Component} from 'react';

const ninja = "https://static-cdn.jtvnw.net/jtv_user_pictures/ninja-profile_image-aa970b6b22d0ebbe-300x300.jpeg"
const memory = 'http://www.artnewsblog.com/wp-content/uploads/2004/09/the-persistence-of-time.jpg'
const redFuji = "https://data.ukiyo-e.org/aic/images/99027_512658.jpg"
const korea = "https://upload.wikimedia.org/wikipedia/en/6/63/Picasso_Massacre_in_Korea.jpg"
const starry = 'https://www.moma.org/wp/moma_learning/wp-content/uploads/2012/07/Van-Gogh.-Starry-Night-469x376.jpg'
const mona = 'https://i.pinimg.com/736x/ba/cc/bb/baccbbba015663a364d12c71dfaaca22--monna-lisa-funny-art.jpg'
export default function PaintingDropdown (props){
    // console.log("DrOpDowN PrOps",props);
    let currentGallery= props.currentGallery;
    let handleChange=props.handleChange;
    let selected = props.selected;
    console.log("ninja", ninja);
    return(
        
        <select name="thumbnailUrl" onChange={handleChange} style={{backgroundColor: 'grey'}}>
        
        <option value={ninja}>Ninja</option>
        <option value={mona}>Mona</option>
        <option value={starry}>Starry</option>
        <option value={memory}>Memory</option>
        <option value={redFuji}>redFuji</option>
        <option value={korea}>korea</option>
        {
            currentGallery && currentGallery.paintings.map(painting=>{
                return(
                  <option   key={painting.id}  value={painting.url}>{painting.name}</option>
                );
              })
        }
            
           
        </select>
        );

}