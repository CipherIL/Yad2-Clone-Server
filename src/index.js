const app = require("./app");

require('./database/mongoose');

app.listen(process.env.PORT,()=>{
    console.log('App listening on port ' + process.env.PORT);
})