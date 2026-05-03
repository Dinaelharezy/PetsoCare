
// //sh8aaal
import { NextResponse } from "next/server";
import {auth} from '../../../../lib/auth'




export async function GET(request: Request) {
  try {
    // 👇 جيب الـ session عشان تاخد الـ token
    const session = await auth()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
      { 
        cache: "no-store",
        headers: { 
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${session?.user?.accessToken ?? ''}`, // 👈 ضيف ده
        },
      }
    );

    const text = await response.text()
    
    if (!text || text.trim() === '') {
      return NextResponse.json([])
    }

    let data: any
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'Invalid response from server' }, { status: 500 })
    }

    const articles = Array.isArray(data) ? data : (data.items ?? data.data ?? []);
    // const normalized = articles.map((a: any) => ({
    //   id:          a.id          ?? a.Id,
    //   title:       a.titleEn     ?? a.TitleEn     ?? a.title   ?? a.Title   ?? '',
    //   summary:     a.summaryEn   ?? a.SummaryEn   ?? a.summary ?? a.Summary ?? '',
    //   content:     a.contentEn   ?? a.ContentEn   ?? a.content ?? a.Content ?? '',
    //   source:      a.source      ?? a.Source      ?? '',
    //   category:    a.category    ?? a.Category    ?? '',
    //   publishDate: a.publishDate ?? a.PublishDate ?? '',
    //   imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image   ?? a.Image   ?? '',
    //   published:   a.published   ?? a.Published   ?? true,
    // }));

    const normalized = articles.map((a: any) => ({
  id:          a.id          ?? a.Id,
  title:       a.titleEn     ?? a.TitleEn     ?? a.title   ?? a.Title   ?? '',
  summary:     a.summaryEn   ?? a.SummaryEn   ?? a.summary ?? a.Summary ?? '',
  content:     a.contentEn   ?? a.ContentEn   ?? a.content ?? a.Content ?? '',
  titleEn:     a.titleEn     ?? a.TitleEn     ?? a.title   ?? a.Title   ?? '',  // 👈
  summaryEn:   a.summaryEn   ?? a.SummaryEn   ?? a.summary ?? a.Summary ?? '',  // 👈
  contentEn:   a.contentEn   ?? a.ContentEn   ?? a.content ?? a.Content ?? '',  // 👈
  source:      a.source      ?? a.Source      ?? '',
  category:    a.category    ?? a.Category    ?? '',
  publishDate: a.publishDate ?? a.PublishDate ?? '',
  imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image   ?? a.Image   ?? '',
  published:   a.published   ?? a.Published   ?? true,
}))

    return NextResponse.json(normalized);

  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth() // 👈 جيب الـ session

    const formData = await request.formData()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
      {
        method: 'POST',
        headers: { 
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${session?.user?.accessToken ?? ''}`, // 👈 ضيف ده
        },
        body: formData
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const text = await response.text();
    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ success: true });
    }

  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Failed to send FormData' }, { status: 500 });
  }
}