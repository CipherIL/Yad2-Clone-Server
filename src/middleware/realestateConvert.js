const typesReducer = (prev,curr) => [...prev, ...curr];

const getSearchParams = (req,res,next) => {
    const searchObj = req.body;
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
                break;
            }
            case "entryNow" : {
                if(!searchObj[key]) {
                    searchParams['realestateData.entryNow'] = false;
                } else {
                    searchParams['realestateData.entryNow'] = true;
                }
                break;
            }
            case "freeText" : {
                if(!searchObj[key]|| searchObj[key]==="") break;
                searchParams['realestateData.description'] = {$regex:RegExp(`${searchObj[key]}`)};
                break;
            }
            case "features" : {
                if(!searchObj[key] || searchObj[key].length===0) break;
                searchParams['realestateData.features'] = {$all:searchObj[key]};
                break;
            }
            default: break;
        }
    })
    req.searchParams = searchParams;
    next();
}

module.exports = getSearchParams;