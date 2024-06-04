const express = require('express')
const supabase = require('../supabase/supabaseClient')

const router = express.Router()

// GET ALL Splits
router.post('/getSplits', async (req, res) => {
    const user_id = req.body.userID

    try {
        let { data } = await supabase
            .from('Workout_Splits')
            .select('*')
            .eq('user_id', user_id);
        const response = data
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
})

// POST A Split
router.post('/addSplits', async (req, res) => {
    const split = req.body
    console.log(split)
    try {
        const { data } = await supabase
                        .from('Workout_Splits')
                        .insert([{ split_name: split.split_name,
                                   items: split.items,
                                   email: split.email,
                                   user_id: split.user_id},])
        res.status(200).json({data})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
    
})

// DELETE A Split

// GET SPECIFIC Split
router.post('/getSplit', async (req, res) => {
    const user_id = req.body.userID
    const split_name = req.body.name
    console.log(req.body)
    try {
        let { data } = await supabase
            .from('Workout_Splits')
            .select('*')
            .eq('split_name', split_name)
        const response = await data
        console.log(response)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
})



module.exports = router