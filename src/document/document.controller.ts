import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { Types } from 'mongoose';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}
  @Get('getAllDocument')
  async getAllDocument() {
    return this.documentService.getAllDocument();
  }
  @Get('getDocumentById/:id')
  async getDocumentById(@Param('id') id: string) {
    return this.documentService.getDocumentById(new Types.ObjectId(id));
  }
  @Get('getDocumentByEmployee/:id')
  async getDocumentByEmployee(@Param('id') id: string) {
    return this.documentService.getDocumentByEmployee(new Types.ObjectId(id));
  }
  @Post('createDocument')
  async createDocument(@Body() data: any) {
    return this.documentService.createDocument(data);
  }
  @Get('searchDocumentByTitle')
  async searchDocumentByTitle(@Query('title') title: string) {
    return this.documentService.searchDocumentByTitle(title);
  }
  @Get('searchDocumentByType')
  async searchDocumentByType(@Query('type') type: string) {
    return this.documentService.searchDocumentByType(type);
  }
  @Delete('deleteDocumentById/:id')
  async deleteDocumentById(@Param('id') id: string) {
    return this.documentService.deleteDocumentById(new Types.ObjectId(id));
  }
}
