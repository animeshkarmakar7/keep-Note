import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For better text handling and tables
import ReactQuill, { Quill } from 'react-quill';
import Modal from 'react-modal';
import 'react-quill/dist/quill.snow.css';
import './note.css';


const Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);

const Note = ({ items, setItems }) => {
  const { index } = useParams();
  const noteIndex = parseInt(index);
  const note = items[noteIndex];

  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfName, setPdfName] = useState('note.pdf');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[noteIndex] = {
        ...newItems[noteIndex],
        title: newTitle,
      };
      return newItems;
    });
  };

  const handleContentChange = (value) => {
    setContent(value);
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[noteIndex] = {
        ...newItems[noteIndex],
        content: value,
      };
      return newItems;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const lineHeight = 10;
    let y = margin;

    doc.setFontSize(16);
    doc.text(`Title: ${title}`, margin, y);
    y += lineHeight * 2;

    doc.setFontSize(12);

  
    const container = document.createElement('div');
    container.innerHTML = content;
    const splitContent = Array.from(container.childNodes).map((node) => {
      if (node.tagName === 'INPUT' && node.type === 'checkbox') {
        return node.checked ? '[X] ' : '[ ] ';
      }
      return node.textContent || '';
    });

    splitContent.forEach((line, index) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    if (pdfName) {
      doc.save(`${pdfName}`);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  if(!note){
    return <div className='notfound'>Note not found</div>
  }

  return (
    <div className="note-container">
      <div className="header-container">
        <input 
          type="text" 
          value={title} 
          onChange={handleTitleChange} 
          placeholder="Enter your title..."
        />
      </div>
      <div className="content">
        <ReactQuill 
          value={content} 
          onChange={handleContentChange} 
          placeholder="Enter your content..."
          modules={{
            toolbar: [
              [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['clean'],
             
            ]
          }}
          formats={[
            'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'image', 'color', 'background', 'align'
          ]}
        />
      </div>
      <button onClick={openModal} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
        Preview & Download PDF
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="PDF Preview"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>PDF Preview</h2>
        <label>
          PDF Name:
          <input 
            type="text" 
            value={pdfName} 
            onChange={(e) => setPdfName(e.target.value)} 
            placeholder="Enter PDF name..."
          />
        </label>
        <button onClick={generatePDF}>Download PDF</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Note;
