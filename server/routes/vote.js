import  express from 'express';

const routervote = express.Router();

import {newvoteModel} from '../postges/vote.js';

import {newuserModel} from '../postges/user.js';

import { where } from 'sequelize';

function checkAdmin(userDetail)
{
    if(userDetail.role==="admin")
    {
      return true;
    }
    return false;
}

routervote.post('/vote', async (req, res) => {
  try {
    const {candidateId,userId} = req.body;
    const checkStatus = await newuserModel.findOne({ where: { id: userId} });

    if(checkStatus&&checkAdmin(checkStatus))
      {
        res.json({admin:"user is admin ,so admin can't vote"});
      }
    else if(checkStatus&&checkStatus.isVoted)
    {
      res.json({message:"user has already voted"});
    }
    else{
      const newVote = await newvoteModel.create({candidateId,userId});
      await newuserModel.update({ isVoted: true }, { where: { id: userId} });
      res.status(201).json(newVote);
    } 
  }
   catch (error) {
    console.error('Error while voting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

routervote.get('/votecount/:id', async (req, res) => {
  try {
    const {id}=req.params;
    const candidates = await newvoteModel.findAll({ where: {candidateId:id} });
    if (!candidates) {
      return res.status(404).json({ error: 'Candidates not found' });
    }
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default routervote;


