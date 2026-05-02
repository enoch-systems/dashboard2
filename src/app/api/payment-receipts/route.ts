import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Missing required Supabase environment variables for payment receipts API.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const amountRaw = (formData.get('amount') as string)?.trim();
    const course = formData.get('course') as string || '';
    const paymentType = formData.get('paymentType') as string || 'proof_submission';
    const proofImage = formData.get('proofImage') as File;
    const amountIsNumeric = /^\d+$/.test(amountRaw || '');
    const amount = Number.parseInt(amountRaw || '', 10);

    // Validate required fields
    if (!name || !email || !amountRaw || !proofImage) {
      return NextResponse.json(
        { error: 'Name, email, amount, and proof image are required' },
        { status: 400 }
      );
    }

    if (!amountIsNumeric || !Number.isFinite(amount) || amount < 0) {
      return NextResponse.json(
        { error: 'Amount must contain numbers only.' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!proofImage.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    console.log('Uploading image to Cloudinary:', proofImage.name, proofImage.type, proofImage.size);
    let cloudinaryResult;
    try {
      cloudinaryResult = await uploadImageToCloudinary(proofImage);
      console.log('Cloudinary upload successful:', cloudinaryResult);
    } catch (cloudinaryError) {
      console.error('Cloudinary upload failed:', cloudinaryError);
      return NextResponse.json(
        { error: 'Failed to upload image to Cloudinary. Please try again.' },
        { status: 500 }
      );
    }

    const normalizedEmail = normalizeEmail(email);
    // Create payment receipt record
    const paymentReceipt = {
      student_name: name,
      email: normalizedEmail,
      amount,
      course,
      payment_date: new Date().toISOString().split('T')[0],
      payment_type: paymentType,
      status: 'pending',
      cloudinary_public_id: cloudinaryResult.publicId,
      cloudinary_url: cloudinaryResult.url,
      original_filename: cloudinaryResult.originalFilename,
    };

    console.log('Attempting to save payment receipt:', paymentReceipt);

    const { data, error } = await supabaseAdmin
      .from('payment_receipts')
      .insert(paymentReceipt)
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json(
        { error: `Failed to save payment receipt: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Payment receipt saved successfully:', data);

    return NextResponse.json({
      success: true,
      message: 'Payment receipt uploaded successfully',
      data
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Missing required Supabase environment variables for payment receipts API.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('payment_receipts')
      .select('*')
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch payment receipts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
