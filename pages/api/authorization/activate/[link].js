import userService from "../../../../src/auth/service/userService";
import { catchErrorsApi } from '../../../../middleware/exceptions';
import checkCors from "../../../../middleware/cors";

export default catchErrorsApi( async (req, res) => {
    
    checkCors(req,res,{
        methods: ['GET']
      });

    const { link } = req.query;
    
    await userService.activate(link);

    return res.redirect(process.env.NEXT_PUBLIC_CLIENT_URL);

})