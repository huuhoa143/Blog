var express = require("express");
var router = express.Router();

var axios = require("axios");


var urlList = [];

router.get("/", function (req, res) {
    res.render("blog/index");
});


router.get("/about", function (req, res) {
    res.render("blog/about");
});

function getStreamUrl(id) {
    let url = "http://api.nhac.vn/client/song%2Flisten?profile_id=4&id=" + id;
    return axios.get(url).then(function (response) {
        let datar = response.data.data;
        // console.log(datar);
        if(datar) {
            let stream_url = datar.streaming_url;
            console.log(stream_url);
            urlList.push(stream_url);
        } else {
            return Promise.resolve(urlList);
        }
    }).catch(function (err) {
        console.log("Error 1");
    });
}

function getAllSong(encode_name) {
    var url = "http://api.nhac.vn/client/search?type=song&limit=30&offset=0&keyword=" + encode_name;
    return axios.get(url).then(function (response) {
        let datar = response.data.data;
        if(datar) {
            // console.log(datar);
            for(var i = 0; i < datar.length; i++) {
                // console.log(datar[i].id + "\n");
                getStreamUrl(datar[i].id);
            }

        }
        else {
            return Promise.resolve(urlList);
        }
    }).catch(function (err) {
        console.log("Error 2");
    });
}

router.post("/about", function (req, res) {
    let data = req.body;
    console.log(data.url);
    let encode_name = encodeURI(data.url);
    getAllSong(encode_name).then(function (data) {
        res.return("blog/about");
    }).catch(function (err) {
        res.render("blog/about");
    });
});
module.exports = router;