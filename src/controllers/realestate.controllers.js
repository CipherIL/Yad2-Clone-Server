const Realestate = require('../models/realestate');

const getRealestatePosts = async (req,res) => {
    try {
        const posts = await Realestate.find(req.searchParams)
        .sort({'date':-1})
        .skip(req.body.skip)
        .limit(req.body.limit);
        if(posts.length === 0) return res.status(404).send("No posts found");
        return res.status(200).send(posts);
    } catch(err) {
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getRealestatePosts,
}