import { NextRequest, NextResponse } from 'next/server';

// Backend URL (Express server on port 3000)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Forward data to Express backend
    const response = await fetch(`${BACKEND_URL}/api/products`, {
      method: 'POST',
      body: formData, // Send FormData as is
      // Don't set Content-Type as FormData sets it automatically
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Server error' }));
      return NextResponse.json(
        { message: errorData.message || 'Error adding product' },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('Backend connection error:', error);
    
    // Check error type
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch')) {
      return NextResponse.json(
        { message: 'Cannot connect to backend. Make sure the server is running on port 3000.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error occurred while adding product: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Server error' }));
      return NextResponse.json(
        { message: errorData.message || 'Error fetching products' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error occurred while fetching products: ' + error.message },
      { status: 500 }
    );
  }
}
