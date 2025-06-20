import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Configuração para processar o upload
    const multer = require('multer');
    const upload = multer({
      storage: multer.diskStorage({
        destination: async (req: any, file: any, cb: any) => {
          const uploadDir = path.join(process.cwd(), 'public', 'img');
          
          // Cria o diretório se não existir
          if (!fs.existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
          }
          
          cb(null, uploadDir);
        },
        filename: (req: any, file: any, cb: any) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        },
      }),
    });

    // Middleware do multer para processar o upload
    await new Promise((resolve, reject) => {
      upload.single('image')(req as any, res as any, (err: any) => {
        if (err) return reject(err);
        resolve(true);
      });
    });

    // @ts-ignore
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }

    // Retorna o caminho relativo (ex: 'img/nome-do-arquivo.jpg')
    const relativePath = path.join('img', file.filename).replace(/\\/g, '/');
    
    res.status(200).json({ 
      filePath: relativePath,
      message: 'Upload realizado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ message: 'Erro ao processar upload' });
  }
}