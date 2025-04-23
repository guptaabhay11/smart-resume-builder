import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { PDFClassicTemplate } from './pdf-template/ClassicPdf';
import { ModernPdf } from './pdf-template/ModernPdf';
import { ResumeData } from '@/types/resume';

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
      return <ModernPdf data={data} />;
    default:
      return <PDFClassicTemplate data={data} />;
  }
};




export default PDFResumeDocument;
