import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing Supabase environment variables' 
        },
        { status: 500 }
      );
    }
    
    // Parse request body
    const { title, document } = await request.json();
    
    // Validate request data
    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Missing document title' },
        { status: 400 }
      );
    }
    
    if (!document || !document.title || !document.summary || !document.longSummary || !document.children) {
      return NextResponse.json(
        { success: false, message: 'Invalid document structure' },
        { status: 400 }
      );
    }
    
    // Create a Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    // Insert or update the document
    const { error } = await supabase
      .from('documents')
      .upsert({
        title,
        document
      }, {
        onConflict: 'title'
      });
    
    // Handle database error
    if (error) {
      console.error('Document upload error:', error);
      return NextResponse.json(
        { success: false, message: `Upload failed: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    );
  }
}
