import  express from 'express';

const routercandidate = express.Router();

import { newcandidateModel } from '../postges/candidate.js';
import { newvoteModel } from '../postges/vote.js';
import { where } from 'sequelize';

// enrolling the candiates...........

routercandidate.post('/candidate', async (req, res) => {
  try {
    const { name,image,party,age} = req.body;
    const newCandidate = await newcandidateModel.create({ name,image,party,age});
    res.status(201).json(newCandidate);
  }
   catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all the condidates....

routercandidate.get("/all_candidate",async(req,res)=>
{
  const candidates=await newcandidateModel.findAll({});
  res.status(200).json(candidates);
})



// update candidates....

routercandidate.put('/candidate/:id', async (req, res) => {
  try {
    const { name,image,party,age } = req.body;
    const [updated] = await newcandidateModel.update({ name,image,party,age }, { where: { id: req.params.id } });
    if (updated) {
      const updatedBlog = await newcandidateModel.findByPk(req.params.id);
      return res.json(updatedBlog);
    }
    return res.status(404).json({ error: 'Candidate not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get Single Candidate...............
routercandidate.get('/candidate/:id', async (req, res) => {
  try {
    const candidate = await newcandidateModel.findByPk(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

routercandidate.delete('/candidate/:id', async (req, res) => {
  try {
    const deleted = await newcandidateModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      await newvoteModel.destroy({where:{candidateId:req.params.id}});
      return res.status(204).send();
    }
    return res.status(404).json({ error: 'Candidate not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default routercandidate;


