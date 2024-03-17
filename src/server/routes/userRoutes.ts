import { register } from '../controllers/usersController';
import express, { Router, Request, Response } from 'express';

//import { register } from '../controllers/usersController';
//import { verifyJWT } from "../middleware/verifyJWT";

//It maps HTTP request methods (such as GET, POST, PUT, DELETE).
const router: Router = express.Router();
//router.post("/register", register as (req: Request, res: Response) => void);
router.post("/register", register);
/*
router.post('/register', async(req,res)=>{});
router.post('/', async(req,res)=>{});
router.get('/', async(req,res)=>{});
router.get('/:id', async(req,res)=>{});
router.put('/:id', async(req,res)=>{});
router.delete('/:id', async(req,res)=>{});
*/
export default router;

/*
const usersRouter: Router = express.Router();

usersRouter.get("/", verifyJWT, getAllUsers);

usersRouter.put("/:userId", verifyJWT, editUser)

export default usersRouter;
*/

/*
Example routes might include /users/register for user registration,
 /users/login for user authentication, /users/:id for fetching or updating user details, etc.
*/ 




