

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    const contentType = request.headers.get("content-type") || "";

    let body: any;
    let apiBody: BodyInit;
    let headers: HeadersInit = {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${session?.user?.accessToken ?? ""}`,
    };

    // ─── لو FormData (فيه صورة) ─────────────────────────
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      const fd = new FormData();

      fd.append("Title", formData.get("Title") as string);
      fd.append("Summary", formData.get("Summary") as string);
      fd.append("Content", formData.get("Content") as string);

      fd.append("TitleEn", formData.get("TitleEn") as string);
      fd.append("SummaryEn", formData.get("SummaryEn") as string);
      fd.append("ContentEn", formData.get("ContentEn") as string);

      fd.append("Category", formData.get("Category") as string);
      fd.append("PublishDate", formData.get("PublishDate") as string);
      fd.append("Source", formData.get("Source") as string);
      fd.append("Published", formData.get("Published") as string);

      const image = formData.get("Image");

      if (image) {
        fd.append("Image", image);
      }

      apiBody = fd;

    } else {
      // ─── JSON عادي ────────────────────────────────────
      body = await request.json();

      const payload = {
        Title: body.titleEn ?? body.title ?? "",
        Summary: body.summaryEn ?? body.summary ?? "",
        Content: body.contentEn ?? body.content ?? "",

        TitleEn: body.titleEn ?? body.title ?? "",
        SummaryEn: body.summaryEn ?? body.summary ?? "",
        ContentEn: body.contentEn ?? body.content ?? "",

        Category: body.category ?? "",
        PublishDate:
          body.publishDate ?? new Date().toISOString(),

        Source: body.source ?? "",
        Published: body.published ?? true,
      };

      headers["Content-Type"] = "application/json";

      apiBody = JSON.stringify(payload);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}`,
      {
        method: "PUT",
        headers,
        body: apiBody,
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: text },
        { status: response.status }
      );
    }

    if (!text || text.trim() === "") {
      return NextResponse.json({ success: true });
    }

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ success: true });
    }

  } catch (error) {
    console.error("PUT ARTICLE ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}




export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth() // 👈
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}`,
    {
      method: "DELETE",
      headers: { 
        "ngrok-skip-browser-warning": "true",
        "Authorization": `Bearer ${session?.user?.accessToken ?? ''}`, // 👈
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: response.status });
  }

  return NextResponse.json({ success: true });
}



export async function GET(
  request: Request,
{ params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") ?? "en";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Articles/${id}?lang=${lang}`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Article not found" }, { status: response.status });
    }

    const a = await response.json();

    const normalized = {
      id:          a.id          ?? a.Id,
      title:       a.title       ?? a.Title       ?? '',
      summary:     a.summary     ?? a.Summary     ?? '',
      content:     a.content     ?? a.Content     ?? '',
      source:      a.source      ?? a.Source      ?? '',
      category:    a.category    ?? a.Category    ?? '',
      publishDate: a.publishDate ?? a.PublishDate ?? '',
      imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image ?? a.Image ?? '',
      published:   a.published   ?? a.Published   ?? true,
    }

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}