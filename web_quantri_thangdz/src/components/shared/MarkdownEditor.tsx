'use client';

import { useRef, useState } from 'react';
import {
  Bold,
  Heading2,
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
} from 'lucide-react';
import { api } from '@/lib/api';

interface MarkdownEditorProps {
  id: string;
  name: string;
  value: string;
  rows?: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({
  id,
  name,
  value,
  rows = 16,
  placeholder,
  onChange,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const updateValue = (nextValue: string, nextCursor?: number) => {
    onChange(nextValue);
    requestAnimationFrame(() => {
      if (textareaRef.current && nextCursor !== undefined) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(nextCursor, nextCursor);
      }
    });
  };

  const wrapSelection = (before: string, after = before, fallback = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || fallback;
    const insertion = `${before}${selected}${after}`;
    updateValue(value.slice(0, start) + insertion + value.slice(end), start + insertion.length);
  };

  const insertBlock = (prefix: string, fallback = 'Noi dung') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const lines = (selected || fallback)
      .split(/\r?\n/)
      .map((line, index) => {
        if (prefix === '1. ') return `${index + 1}. ${line || fallback}`;
        return `${prefix}${line || fallback}`;
      })
      .join('\n');
    const needsLeadingBreak = start > 0 && value[start - 1] !== '\n';
    const needsTrailingBreak = end < value.length && value[end] !== '\n';
    const insertion = `${needsLeadingBreak ? '\n' : ''}${lines}${needsTrailingBreak ? '\n' : ''}`;
    updateValue(value.slice(0, start) + insertion + value.slice(end), start + insertion.length);
  };

  const insertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    updateValue(value.slice(0, start) + text + value.slice(end), start + text.length);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const response = await api.uploadMedia(file);
      const imageUrl = response.data?.url || response.url;
      if (imageUrl) {
        insertText(`\n![${file.name}](${imageUrl})\n`);
      }
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const tools = [
    { label: 'Tieu de', icon: Heading2, action: () => insertBlock('## ', 'Tieu de') },
    { label: 'Dam', icon: Bold, action: () => wrapSelection('**', '**', 'chu dam') },
    { label: 'Nghieng', icon: Italic, action: () => wrapSelection('*', '*', 'chu nghieng') },
    { label: 'Bullet list', icon: List, action: () => insertBlock('- ', 'Muc noi dung') },
    { label: 'Number list', icon: ListOrdered, action: () => insertBlock('1. ', 'Muc noi dung') },
    { label: 'Trich dan', icon: Quote, action: () => insertBlock('> ', 'Trich dan') },
    { label: 'Duong ke', icon: Minus, action: () => insertText('\n---\n') },
    { label: 'Link', icon: Link, action: () => wrapSelection('[', '](https://example.com)', 'noi dung link') },
  ];

  return (
    <div className="markdown-editor">
      <div className="markdown-toolbar">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.label}
              type="button"
              className="markdown-tool-btn"
              title={tool.label}
              onClick={tool.action}
            >
              <Icon size={16} />
            </button>
          );
        })}
        <button
          type="button"
          className="markdown-tool-btn"
          title="Them anh tu may tinh"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <span className="spinner spinner-sm" /> : <ImagePlus size={16} />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </div>
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        className="input markdown-textarea"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
