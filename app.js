require('dotenv').config()
const express = require('express')
const app = express()
const {getCityInfo, getJobs}= require('./util.js')

app.use(express.static('public'))


app.get('/api/city/:city', async (req, res) => {
    try {
        const cityInfo = await getCityInfo(req.params.city)
        const jobs = await getJobs(req.params.city)
        if (cityInfo || jobs) {
            res.status(200).json({ cityInfo, jobs })
        } else {
            res.status(404).json({ error: 'API information for a city/job is not found' })
        }
    } catch (err) {
        console.log(err)
    }
});

// INSTRUCTIONS:
// TODO: import the getCityInfo and getJobs functions from util.js/DONE
// TODO: Statically serve the public folder
// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status

module.exports = app
