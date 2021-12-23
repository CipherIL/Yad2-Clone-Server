const Realestate = require('../models/realestate');

const getSearchParams = (searchObj) => {
    const searchParams = {};
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
        console.log(posts)
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