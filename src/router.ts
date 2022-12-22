import { Request, Response, Router } from 'express';
import {Container} from "typedi";
import {UserService} from "./service/user.service";

const router = Router();

router.get('/users', async (req, res) => {
  const service = Container.get<UserService>(UserService);
  const users = await service.findAll();
  return res.json(users);
});

export default router;
