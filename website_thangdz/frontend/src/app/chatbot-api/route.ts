import { NextRequest, NextResponse } from "next/server";

// Fallback URL hardcode để đảm bảo chatbot luôn hoạt động dù .env.local thiếu biến
const N8N_FALLBACK_URL = "https://thangdepzai.devttt.com/webhook/thangdz";
const N8N_CHAT_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL || N8N_FALLBACK_URL;

type ChatRequestBody = {
  message?: unknown;
  sessionId?: unknown;
  user?: unknown;
  page?: unknown;
};

function cleanReply(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  const reply = value.trim();

  if (!reply) {
    return "";
  }

  if (reply.includes("{{") && reply.includes("}}")) {
    return "";
  }

  if (reply === "[object Object]") {
    return "";
  }

  return reply.replace(/\\n/g, "\n");
}

function parseJsonString(value: string): unknown {
  const trimmedValue = value.trim();

  if (!trimmedValue.startsWith("{") && !trimmedValue.startsWith("[")) {
    return null;
  }

  try {
    return JSON.parse(trimmedValue);
  } catch {
    return null;
  }
}

function extractReply(data: unknown): string {
  if (typeof data === "string") {
    const parsedData = parseJsonString(data);

    if (parsedData !== null) {
      return extractReply(parsedData);
    }

    return cleanReply(data);
  }

  if (Array.isArray(data)) {
    for (const item of data) {
      const reply = extractReply(item);
      if (reply) {
        return reply;
      }
    }
    return "";
  }

  if (!data || typeof data !== "object") {
    return "";
  }

  const record = data as Record<string, unknown>;

  const preferredKeys = ["output", "answer", "response", "reply", "message", "text", "result"];
  for (const key of preferredKeys) {
    const reply = cleanReply(record[key]);
    if (reply) {
      return reply;
    }
  }

  for (const key of preferredKeys) {
    if (key in record && record[key] && typeof record[key] === "object") {
      const nestedReply = extractReply(record[key]);
      if (nestedReply) {
        return nestedReply;
      }
    }
  }

  const nestedKeys = ["data", "json", "body", "item", "content", "payload"];
  for (const key of nestedKeys) {
    if (key in record) {
      const nestedReply = extractReply(record[key]);
      if (nestedReply) {
        return nestedReply;
      }
    }
  }

  return "";
}

export async function POST(request: NextRequest) {
  if (!N8N_CHAT_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "Chua cau hinh N8N_CHAT_WEBHOOK_URL trong file .env.local." },
      { status: 500 },
    );
  }

  let body: ChatRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Du lieu gui len khong hop le." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Tin nhan khong duoc de trong." }, { status: 400 });
  }

  try {
    const n8nResponse = await fetch(N8N_CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId: body.sessionId,
        user: body.user,
        page: body.page,
        sentAt: new Date().toISOString(),
        source: "thangdz.com",
      }),
    });

    const contentType = n8nResponse.headers.get("content-type") || "";
    const responseData = contentType.includes("application/json")
      ? await n8nResponse.json()
      : await n8nResponse.text();

    if (!n8nResponse.ok) {
      const detailMessage = typeof responseData === "object" && responseData && "message" in responseData
        ? String((responseData as Record<string, unknown>).message)
        : "n8n webhook tra ve loi.";

      return NextResponse.json(
        {
          error: detailMessage,
          detail: responseData,
        },
        { status: n8nResponse.status },
      );
    }

    const reply = extractReply(responseData);

    return NextResponse.json({
      reply: reply || "Minh da nhan duoc tin nhan cua ban, nhung n8n chua tra ve noi dung tra loi hop le.",
      raw: responseData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Khong the ket noi n8n webhook.";

    return NextResponse.json(
      {
        error: "Khong the gui tin nhan den n8n webhook.",
        detail: message,
      },
      { status: 502 },
    );
  }
}
