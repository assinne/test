const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => {
    const osInfo = os.userInfo();
    const username = osInfo.username;
    //console.log(JSON.stringify(osInfo));
    return res.send({ username:  username });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
