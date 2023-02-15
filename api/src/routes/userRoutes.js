const { Router } = require('express');
const router = Router();
const {middUser, middGetUser} = require('../middleware/middlewareUsers')




router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const user = req.body;
    try {
    
        const updated = await middUser(id, user);
    
        res.status(200).json(updated);
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'No se pudo actualizar el usuario',
          error: error.message,
        });
      }
})


router.get('/:id', async(req,res) => {
 const {id} = req.params 
 try {
  const user = await middGetUser(id)
  res.json(user)
 } catch (error) {
  res.status(400).send(error)
 }
})

module.exports = router;