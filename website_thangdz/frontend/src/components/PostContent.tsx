'use client';

function isImageUrl(value: string) {
  try {
    const url = new URL(value);
    return /\.(png|jpe?g|webp|gif|avif)$/i.test(url.pathname);
  } catch {
    return false;
  }
}

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s]+)/g);

  return parts.map((part, index) => {
    if (!part) return null;

    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return (
        <strong key={`${part}-${index}`} className="font-extrabold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      return (
        <em key={`${part}-${index}`} className="text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${part}-${index}`} className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-200">
          {part.slice(1, -1)}
        </code>
      );
    }

    const markdownLink = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (markdownLink) {
      return (
        <a
          key={`${part}-${index}`}
          href={markdownLink[2]}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-4 hover:text-cyan-200"
        >
          {markdownLink[1]}
        </a>
      );
    }

    if (part.startsWith('http')) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-4 hover:text-cyan-200"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

function ImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-4 flex justify-center">
      <img
        src={src}
        alt={alt}
        className="max-h-[560px] max-w-full rounded-xl object-contain"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}

export default function PostContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);

  return (
    <div className="flex flex-col gap-4 text-base leading-8 md:text-lg md:leading-9">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();

        if (!line) {
          return <div key={index} className="h-2" />;
        }

        const markdownImage = line.match(/^!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)$/i);
        if (markdownImage) {
          return (
            <ImageBlock
              key={index}
              src={markdownImage[2]}
              alt={markdownImage[1] || 'Anh bai viet'}
            />
          );
        }

        if (isImageUrl(line)) {
          return <ImageBlock key={index} src={line} alt="Anh bai viet" />;
        }

        if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
          return <hr key={index} className="my-4 border-white/10" />;
        }

        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="pt-3 text-2xl font-extrabold leading-snug text-white">
              {renderInlineText(line.slice(4))}
            </h3>
          );
        }

        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="pt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              {renderInlineText(line.slice(3))}
            </h2>
          );
        }

        if (line.startsWith('# ')) {
          return (
            <h2 key={index} className="pt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              {renderInlineText(line.slice(2))}
            </h2>
          );
        }

        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={index} className="flex gap-3 text-slate-300">
              <span className="mt-3 h-2 w-2 flex-none rounded-full bg-cyan-300" />
              <p className="flex-1">{renderInlineText(line.slice(2))}</p>
            </div>
          );
        }

        const numberedItem = line.match(/^(\d+)\.\s+(.+)$/);
        if (numberedItem) {
          return (
            <div key={index} className="flex gap-3 text-slate-300">
              <span className="min-w-7 flex-none font-extrabold text-cyan-300">{numberedItem[1]}.</span>
              <p className="flex-1">{renderInlineText(numberedItem[2])}</p>
            </div>
          );
        }

        return (
          <p key={index} className="text-slate-300">
            {renderInlineText(line)}
          </p>
        );
      })}
    </div>
  );
}
