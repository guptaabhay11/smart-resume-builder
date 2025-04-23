import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { PDFClassicTemplate } from './pdf-template/ClassicPdf';
import {  PDFModernTemplate } from './pdf-template/ModernPdf';
import { ResumeData } from '@/types/resume';
import { PDFMinimalTemplate } from './pdf-template/MinimalPdf';

interface PDFResumeDocumentProps {
  data: ResumeData;
  template: string;
}

const PDFResumeDocument: React.FC<PDFResumeDocumentProps> = ({ data, template }) => {
    console.log('template', template);
  switch (template) {
    case 'classic':
      return <PDFClassicTemplate data={data} />;
    case 'modern':
      return <PDFModernTemplate data={data} />;
    case 'minimal':
      return <PDFMinimalTemplate data={data} />;
    default:
      return <PDFClassicTemplate data={data} />;
  }
};




export default PDFResumeDocument;
