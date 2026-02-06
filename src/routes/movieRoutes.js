import exress from 'express';

const router = exress.Router();

router.get('/',(req,res)=>{
    res.json({message:"List of movies"});
})

export default router;