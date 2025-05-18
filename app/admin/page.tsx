'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [documentJson, setDocumentJson] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Check connection on page load
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/admin/check-connection');
        const result = await response.json();
        
        if (response.ok && result.success) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('error');
          setStatus({ 
            type: 'error', 
            message: result.message || 'Supabase connection not available' 
          });
        }
      } catch (error) {
        setConnectionStatus('error');
        setStatus({ 
          type: 'error', 
          message: `Failed to check connection: ${error instanceof Error ? error.message : String(error)}` 
        });
      }
    };

    checkConnection();
  }, []);

  // Validate the document JSON format
  const validateJson = () => {
    try {
      const parsed = JSON.parse(documentJson);
      // Validate the document structure
      if (!parsed.title || !Array.isArray(parsed.title) || !parsed.title.length) {
        throw new Error('Document must have a non-empty title array');
      }
      if (!parsed.summary || !Array.isArray(parsed.summary)) {
        throw new Error('Document must have a summary array');
      }
      if (!parsed.longSummary || !Array.isArray(parsed.longSummary)) {
        throw new Error('Document must have a longSummary array');
      }
      if (!parsed.children || !Array.isArray(parsed.children)) {
        throw new Error('Document must have a children array');
      }
      
      setStatus({ type: 'success', message: 'JSON validation successful!' });
      return true;
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: `JSON validation failed: ${error instanceof Error ? error.message : String(error)}` 
      });
      return false;
    }
  };

  // Upload the document to Supabase
  const uploadDocument = async () => {
    if (connectionStatus !== 'connected') {
      setStatus({ type: 'error', message: 'Supabase connection is not available' });
      return;
    }

    if (!title.trim()) {
      setStatus({ type: 'error', message: 'Please provide a document title' });
      return;
    }

    if (!validateJson()) return;

    try {
      const document = JSON.parse(documentJson);
      
      const response = await fetch('/api/admin/upload-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: title.trim(), 
          document 
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to upload document');
      }
      
      setStatus({ type: 'success', message: 'Document uploaded successfully!' });
    } catch (error) {
      console.error('Upload error:', error);
      setStatus({ 
        type: 'error', 
        message: `Failed to upload document: ${error instanceof Error ? error.message : String(error)}` 
      });
    }
  };

  if (connectionStatus === 'checking') {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Document Admin Panel</h1>
        <div className="text-center py-10">
          <p className="text-lg">Checking Supabase connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Document Admin Panel</h1>
      
      {connectionStatus === 'error' ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Supabase Connection Error</h2>
          <p>
            Supabase connection is not available. Please make sure your environment variables are set correctly:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li><code>NEXT_PUBLIC_SUPABASE_URL</code>: Your Supabase project URL</li>
            <li><code>SUPABASE_SERVICE_ROLE_KEY</code>: Your service_role key (keep this secret!)</li>
          </ul>
        </div>
      ) : (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          <p className="font-medium">✅ Connected to Supabase</p>
        </div>
      )}
      
      {connectionStatus === 'connected' && (
        <div className="bg-black p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Document Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Document JSON</label>
              <textarea
                className="w-full px-3 py-2 border rounded font-mono h-80"
                value={documentJson}
                onChange={(e) => setDocumentJson(e.target.value)}
                placeholder='{"title": ["Document Title"], "summary": ["Short summary"], "longSummary": ["Longer explanation"], "children": []}'
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={validateJson}
                className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
              >
                Validate JSON
              </button>
              
              <button
                onClick={uploadDocument}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
      
      {status.message && (
        <div className={`mt-4 p-3 rounded ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status.message}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500">
        <h3 className="font-medium">Required Supabase Setup:</h3>
        <ol className="list-decimal ml-5 mt-2">
          <li>Create a table named <code>documents</code> with columns:
            <ul className="list-disc ml-5">
              <li><code>id</code>: uuid (primary key)</li>
              <li><code>title</code>: text (unique)</li>
              <li><code>document</code>: jsonb</li>
              <li><code>created_at</code>: timestamp with time zone (default: now())</li>
            </ul>
          </li>
          <li>SQL to create the table:
            <pre className="bg-gray-800 text-white p-3 rounded mt-2 overflow-auto text-xs">
{`CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT UNIQUE NOT NULL,
  document JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}
            </pre>
          </li>
          <li>Required environment variables:
            <ul className="list-disc ml-5">
              <li><code>NEXT_PUBLIC_SUPABASE_URL</code>: Your Supabase project URL</li>
              <li><code>SUPABASE_SERVICE_ROLE_KEY</code>: Your service_role key (keep this secret!)</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}
