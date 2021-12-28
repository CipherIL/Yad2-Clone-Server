const Realestate = require('../models/realestate');

const typesReducer = (prev,curr) => [...prev, ...curr];

const getSearchParams = (searchObj) => {
    const searchParams = {};
    console.log(searchObj)
    searchParams["realestateData.category"] = searchObj.category
    Object.keys(searchObj).forEach(key=>{
        switch (key) {
            case "address": {
                //if just city
                if(!searchObj[key].street) {
                    if(searchObj[key]!=="")
                    searchParams["realestateData.city"] = searchObj[key];
                }
                //street and city
                else {
                    searchParams["realestateData.street"] = searchObj[key].street;
                    searchParams["realestateData.city"] = searchObj[key].cities[0].trim();
                }
                break;
            }
            case "maxRooms" : {
                searchParams['realestateData.rooms'] = searchParams['realestateData.rooms']?
                                                    {...searchParams['realestateData.rooms'],$lte:parseFloat(searchObj[key])}:
                                                    {$lte:parseFloat(searchObj[key])};
                break;
            }
            case "minRooms" : {
                searchParams['realestateData.rooms'] = searchParams['realestateData.rooms']?
                                                    {...searchParams['realestateData.rooms'],$gte:parseFloat(searchObj[key])}:
                                                    {$gte:parseFloat(searchObj[key])};
                break;
            }
            case "maxPrice": {
                if(searchObj[key]!=="") {
                    searchParams['realestateData.price'] = searchParams['realestateData.price']?
                    {...searchParams['realestateData.price'],$lte:parseFloat(searchObj[key])}:
                    {$lte:parseFloat(searchObj[key])};
                }
                break;
            }
            case "minPrice" : {
                if(searchObj[key]!=="") {
                    searchParams['realestateData.price'] = searchParams['realestateData.price']?
                    {...searchParams['realestateData.price'],$gte:parseFloat(searchObj[key])}:
                    {$gte:parseFloat(searchObj[key])};
                }
                break;
            }
            case "types" : {
                const types = Object.values(searchObj[key]).reduce(typesReducer);
                if(types.length !== 0)
                    searchParams['realestateData.estateType'] = { $in: types };
                break;
            }
            case "minFloor" : {
                if(searchObj[key] === '-1' || searchObj[key] === 'מרתף/פרטר' || !searchObj[key]) break;
                searchParams['realestateData.floor'] = searchParams['realestateData.floor']?
                { ...searchParams['realestateData.floor'], $gte: parseInt(searchObj[key]) }:
                { $gte: parseInt(searchObj[key]) }
                break;
            }
            case "maxFloor" : {
                if(searchObj[key]==="18" || !searchObj[key]) break;
                searchParams['realestateData.floor'] = searchParams['realestateData.floor']?
                { ...searchParams['realestateData.floor'], $lte: parseInt(searchObj[key]) }:
                { $lte: parseInt(searchObj[key]) }
                break;
            }
            case "minArea" : {
                if(searchObj[key]==="") break;
                searchParams['realestateData.builtArea'] = searchParams['realestateData.builtArea']?
                {...searchParams['realestateData.builtArea'], $gte: parseInt(searchObj[key])}:
                { $gte: parseInt(searchObj[key]) };
                break;
            }
            case "maxArea" : {
                if(searchObj[key]==="") break;
                searchParams['realestateData.builtArea'] = searchParams['realestateData.builtArea']?
                {...searchParams['realestateData.builtArea'], $lte: parseInt(searchObj[key])}:
                { $lte: parseInt(searchObj[key]) };
                break;
            }
            case "entryDate" : {
                if(searchObj[key]==="" || !searchObj[key]) break;
                //if entryNow is exactly a boolean true!
                if(searchObj["entryNow"] === true) break;
                searchParams['realestateData.entryDate'] = {$gte: new Date(searchObj[key])};
            }
            case "entryNow" : {
                if(!searchObj[key]) {
                    searchParams['realestateData.entryNow'] = false;
                } else {
                    searchParams['realestateData.entryNow'] = true;
                }
            }
            case "freeText" : {
                if(!searchObj[key]|| searchObj[key]==="") break;
                searchParams['realestateData.description'] = {$regex:RegExp(`${searchObj[key]}`)};
                break;
            }
            //TODO: check that this works
            case "features" : {
                if(!searchObj[key] || searchObj[key]===[]) break;
                searchParams['realestateData.features'] = {$all:searchObj[key]};
                break;
            }
            default: break;
        }
    })
    return searchParams;
}
const filterResultsByArrays = (posts) => {

}


const getRealestatePosts = async (req,res) => {
    const searchParams = getSearchParams(req.body);
    console.log(searchParams)
    try {
        const posts = await Realestate.find(searchParams);
        if(posts.length === 0) return res.status(404).send("No posts found");
        return res.status(200).send(posts);
    } catch(err) {
        return res.status(500).send("Internal Server Error");
    }
}

/* Conversion to new schema 
const convertDate = (dateStr) => {
    const date = new Date(dateStr);
    return date;
}

const convert = async () => {
    try {
        const posts = await Realestate.find();
        posts.forEach(async (post)=>{
            await post.update({
                'realestateData.balconies' : parseInt(post.realestateData.balconies) || 0,
                'realestateData.builtArea' : parseInt(post.realestateData.builtArea) || 0,
                'realestateData.floor' : parseInt(post.realestateData.floor) || 0,
                'realestateData.parkingSpots' : parseInt(post.realestateData.parkingSpots) || 0,
                'realestateData.price' : parseInt(post.realestateData.price),
                'realestateData.rooms' : parseInt(post.realestateData.rooms),
                'realestateData.totalArea' : parseInt(post.realestateData.totalArea) || 0,
                'realestateData.totalFloors' : parseInt(post.realestateData.totalFloors) || 0,
                'realestateData.entryDate' : convertDate(post.realestateData.entryDate),

            })
            console.log(post)
        })
    } catch (err) {
        console.log(err)
    }
}

convert()
.then(res=>{
    console.log("Done")
})
.catch(err=>{
    console.log(err)
})
*/

module.exports = {
    getRealestatePosts,
}