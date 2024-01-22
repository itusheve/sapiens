"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const pipes_1 = require("@nestjs/common/pipes");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    app.useGlobalPipes(new pipes_1.ValidationPipe());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map