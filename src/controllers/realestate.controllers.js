const Realestate = require('../models/realestate');

const getRealestatePosts = async (req,res) => {
    const searchParams = req.body;
    console.log(searchParams)
    try {
        const posts = await Realestate.find(searchParams);
        if(posts.length === 0) return res.status(404).send("No posts found");
        return res.status(200).send(posts);
    } catch(err) {
        return res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getRealestatePosts,
}