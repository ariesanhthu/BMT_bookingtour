// api/homepage/get.js
import { NextResponse } from 'next/server';
import HomePageContent from '@/app/lib/models/HomePage';
import connectDB from '@/app/lib/connectDB';
import seedData from '@/app/lib/seedData';

export async function GET() {
    try {
        await connectDB();

        let homepageContent = await HomePageContent.findOne();
        
        if (!homepageContent) {
            homepageContent = await HomePageContent.create(seedData);

            console.log('Homepage content created:', homepageContent);
        }

        return NextResponse.json({ success: true, data: homepageContent });
    } catch (error) {
        console.error('Error fetching homepage content:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch homepage content' }, { status: 500 });
    }
}



// POST: Tạo mới
export async function POST(req: Request) {
    try {
      await connectDB();
      const body = await req.json();
    console.log('body', body._id);
    if(body._id) {
            const homepageContent = await HomePageContent.findByIdAndUpdate(body._id, body);

            console.log('Homepage content updated:', homepageContent);

            
            return NextResponse.json({ success: true, data: homepageContent });
        }

      const homepageContent = await HomePageContent.create(body);

      return NextResponse.json({ success: true, data: homepageContent });

    } catch (error) {
        console.error('Error updating homepage content:', error);
        return NextResponse.json({ success: false, error: 'Failed to create homepage content' }, { status: 500 });
    }
}