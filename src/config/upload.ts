import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname,'..','..','uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination:uploadFolder,
    filename(request,file,callback){ //chega no servidor com o nome original porém no servidor o nome é mudado para evitar conflito de nomes
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename =  `${fileHash}-${file.originalname}`;
      callback(null,filename);
    }
  }),

}
