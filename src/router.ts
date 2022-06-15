import { Request, Response, Router } from 'express';
import { createMulti, findById } from './entity/user';
import NodeCache from 'node-cache';

const myCache = new NodeCache( { stdTTL: 1000, checkperiod: 100 } );

const router = Router();
router.get('/test', async (req, res) => {
  await createMulti();
  res.json(1);
});

router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  let user = myCache.get(userId);
  if (user) {
    console.log('success get user from cache! ', userId);

    return res.json(user);
  }

  user = await findById(req.params.id);

  console.log('cache data not found, ==============> start set data');
  myCache.set(userId, user, 1000);
  console.log('success set user to cache!!');

  return res.json(user);
});

export default router;
