// Clarifai API
const USER_ID = 'kirilltechnology';
const PAT = 'f869ca70889145759b928f2262e6e3ea'; // Your PAT (Personal Access Token) can be found in the portal under Authentification
const APP_ID = 'my-first-application';
const MODEL_ID = 'face-detection'; // Change these to whatever model and image URL you want to use


const handleClarifaiAPI = (req, res) => {

    // console.log('REQ BODY:',req.body)

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.url // Change to imageURL later after debugging setState
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Bad response / Make sure the link is correct');
            }
            if (response.status !== 500) {
                console.log('ERROR 500:', response.text())
            }
            return response.text()
            // console.log('API:', response.text())
            // res.json(response.text())
        })
        .then(response => res.json(response))
        .catch(err => console.log('ERROR: API connection'))

}

const handleImage = (req, res, db) => {
    const { id, points } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('score', points)
        .returning('score')
        .then(score => res.json(score[0].score))
}


module.exports = {
    handleImage,
    handleClarifaiAPI
}