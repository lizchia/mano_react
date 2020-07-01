import React, {useEffect} from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from 'leaflet'
import { Icon } from "leaflet";
import * as matchaData from "../../data/MatchaBrown.json";
import * as matchaDataDark from "../../data/MatchaDark.json";
import * as matchaDataLight from "../../data/MatchaLight.json";
import * as matchaDataAll from "../../data/MatchaAll.json";
import * as matchaDataRecom from "../../data/MatchaRecom.json";
import "./MapPage.css";
import { Container, Button, Nav, Navbar, Card, Image, Col } from 'react-bootstrap'



const MatchaBrown = "#c5895a"
const MatchaDark = "#5c6447"
const MatchaLight = "#8c9a6a"

const markerBrown = `
  background-color: ${MatchaBrown};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  top: 1.5rem;
  position: relative;
  border-radius: 3rem 4rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

  const markerDark = `
  background-color: ${MatchaDark};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  top: 1.5rem;
  position: relative;
  border-radius: 3rem 4rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

  const markerLight = `
  background-color: ${MatchaLight};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  top: 1.5rem;
  position: relative;
  border-radius: 3rem 4rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

export const iconBrown = Leaflet.divIcon({
  className: "my-custom-pin",
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  html: `<span style="${markerBrown}" />`
})

export const iconDark = Leaflet.divIcon({
  className: "my-custom-pin",
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  html: `<span style="${markerDark}" />`
})

export const iconLight = Leaflet.divIcon({
  className: "my-custom-pin",
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  html: `<span style="${markerLight}" />`
})



export default function MApPage() {
   const [activePark, setActivePark] = React.useState(null);
   const [searchValue, setSearchValue] = React.useState('All');
   const [zoom, setZoom] = React.useState(14);
   const [location, setLocation] = React.useState([25.033510, 121.537720]);




function handleChange(event){


  
setSearchValue(event.target.value);


switch (event.target.value){
  case '大安區':
    setZoom(16);
    setLocation([25.032910, 121.543475]);
    break;

  case '中山區':
    setZoom(16); 
    setLocation([25.048460, 121.516255]);

    break;

  case '中正區':
    setZoom(17);
    setLocation([25.028176, 121.519544]);
    break;

  case '信義區':
    setZoom(17);
    setLocation([25.038661, 121.561003]);
    break;

  case 'All':
    setZoom(15);
    setLocation([25.033510, 121.537720]);
    break;

  default:
    setZoom(15);
    setLocation([25.033510, 121.537720]);
    break;
}

 };

console.log(searchValue)

const recommend = (

  matchaData.features.map(park => (

    <Marker
      color={park.properties.markerColor}
      key={park.properties.PARK_ID}
      position={[
        park.geometry.coordinates[1],
        park.geometry.coordinates[0]
      ]}
      onClick={() => {
        setActivePark(park);
      }}
      icon={iconBrown}
    />
  ))

)

const matcha = (

matchaDataDark.features.map(park => (

  <Marker
    color={park.properties.markerColor}
    key={park.properties.PARK_ID}
    position={[
      park.geometry.coordinates[1],
      park.geometry.coordinates[0]
    ]}
    onClick={() => {
      setActivePark(park);
    }}
    icon={iconDark}
  />
  ))

)

const group = (

matchaDataLight.features.map(park => (

  <Marker
    color={park.properties.markerColor}
    key={park.properties.PARK_ID}
    position={[
      park.geometry.coordinates[1],
      park.geometry.coordinates[0]
    ]}
    onClick={() => {
      setActivePark(park);
    }}
    icon={iconLight}
  />
  ))

)

const all =[]
 all.push(group)
 all.push(matcha)
 all.push(recommend)
console.log(all)



let display

switch (searchValue) {
  case 'Mano推薦':
    display = recommend
    break;
  case '抹茶專門店':
    display =  matcha 
    break;
  case '適合小型聚會':
    display = group
    break;
  case 'All':
    display = all
    break;

  default:
    display = all
}



  return (
    <>
     <Container style={{ paddingTop:"2%", marginBottom:"5%" }}>
     <div className="map-cat"> 
        <div className="map-input">
            <h6>搜尋行政區：</h6>
              <select onChange={handleChange}>
                <option value="All">全區</option>
                <option value="大安區">大安區</option>
                <option value="中正區">中正區</option>
                <option value="信義區">信義區</option>
                <option value="中山區">中山區</option>
              </select>
          </div>
     <Card style={{ marginRight:"10px", width:"20%", height:"20vh" }}>
          <h5 className="mapText">全の分類</h5>
          <img 
          className="map-top-img"
          src="/checkbox/all.jpg" 
          style={{ heigth:"100%" }} 
          onClick={() => {
            setSearchValue("All")
          }}/>
      </Card>
      <Card style={{ marginRight:"10px", width:"20%", height:"20vh" }}>
          <h5 className="mapText">小型聚會</h5>
          <img 
          className="map-top-img"
          src="/checkbox/gather.jpg" 
          style={{height:"100%" }} 
          onClick={() => {
            setSearchValue("適合小型聚會")
          }}
          />  
       </Card>
       <Card style={{ marginRight:"10px", width:"20%", height:"20vh" }}>
           <h5 className="mapText">抹茶專門</h5>
            <img 
            className="map-top-img"
            src="/checkbox/store.jpg" 
            style={{ height:"100%"}} 
            onClick={() => {
              setSearchValue("抹茶專門店")
            }}
          />
       </Card>
       <Card style={{ marginRight:"10px", width:"20%", height:"20vh" }}>
          <h5 className="mapText">抹の推薦</h5>
          <img 
          className="map-top-img"
          src="/checkbox/suggest.jpg" 
          style={{height:"100%"}} 
          onClick={() => {
            setSearchValue("Mano推薦")
          }}
          />
       </Card>
    </div>

      <Map center={location} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {display}

      {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0]
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div style={{ width:"100%"}}>
            <h6>{activePark.properties.NAME}</h6>
            <div style={{ width:"200px", height:"120px"}}>
            <img style={{ width:"100%", height:"100%", objectFit:"cover"}} src={activePark.properties.PICTURE_LI}></img>
            </div>
            <p>{activePark.properties.ADDRESS}</p>
            <p>{activePark.properties.PHONE}</p>
            <a href={activePark.properties.WEBSITE}>{activePark.properties.WEBSITE}</a>
            <div style={{ display:"flex"}}>
            <p style={{ marginRight:"1rem"}} className="facility">{activePark.properties.FACILITY}</p>
            <p style={{ marginRight:"1rem"}} className="facility">{activePark.properties.FACILITY_F}</p>
            <p className="facility">{activePark.properties.DESCRIPTIO}</p>
            </div>
          </div>
        </Popup>
      )}
    </Map>


     <div>
        <h4>information</h4>
          <div className="map-info" > 
            {matchaDataRecom.features.map(park => (
              <div className="info-wrap">
              <a href={park.properties.WEBSITE}  style={{ width:"100vh", height:"40vh"}}>
             <Card style={{ marginRight:"10px", height:"90%" }}>
                 <div className="cardText">
                    <Card.Text style={{ fontSize:".8rem" }}>{park.properties.NAME}</Card.Text>
                    <p style={{ fontSize:".8rem", color:"#5c6447" }}>{park.properties.FACILITY}</p>
                  </div>
                    <Image style={{ overflow:"hidden", height:"90%", objectFit:"cover" }} className="infoImg" src={park.properties.PICTURE_LI}/>
              </Card>
             </a>
             </div>
            ))}
         </div>
      </div>

        </Container>
      </>
  );
}