// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para verificar e adicionar o usuário à requisição
  app.use(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const jwtService = app.get(JwtService);
      try {
        const decoded = jwtService.verify(token);
    
        req.user = decoded;
      } catch (error) {
       
     //   console.error('Token verification failed:', error);
      }
    }
    next();
  });

await app.listen(3080);
}
bootstrap();
