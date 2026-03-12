import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Kyc from '@/models/Kyc';

export async function GET(request) {
  try {
    await connectMongoDB();
    const kycData = await Kyc.find({}).sort({ createdAt: -1 }).lean();
    
    const serializedData = kycData.map(doc => ({
      clerkId: doc.clerkId,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      country: doc.country,
      state: doc.state,
      account: doc.account,
      approve: doc.approve || '0',
      balance: doc.balance || '0',
      idCard: doc.idCard,
      passport: doc.passport,
      createdAt: doc.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: doc.updatedAt?.toISOString() || new Date().toISOString()
    }));
    
    return NextResponse.json({ kyc: serializedData }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Error fetching KYC data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch KYC data' },
      { status: 500 }
    );
  }
}


export const config = {
  api: {
    bodyParser: false,
  },
};
