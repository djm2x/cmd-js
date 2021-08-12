import { Body, Controller, Get, Post } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private service: HomeService) { }

    @Get('/get')
    async read() {
        try {
            return await this.service.childProcessExec('node -v');
            
        } catch (error) {
            const e = error as Error;
            return e.message;
        }
    }

    @Post('/cmd')
    async cmd(@Body() model: {input: string}) {
        try {
            return await this.service.childProcessExec(model.input);
            
        } catch (error) {
            const e = error as Error;
            return e.message;
        }
    }


    // @Put(':id/update')
    // async update(@Param('id') id, @Body() contact: Contact): Promise<any> {
    //     contact.id = Number(id);
    //     return this.contactService.update(contact);
    // }  
    
    // @Delete(':id/delete')
    // async delete(@Param('id') id): Promise<any> {
    //   return this.contactService.delete(id);
    // }
}
