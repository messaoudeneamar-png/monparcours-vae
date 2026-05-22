function slugify(title: string): string {
  return title.slice(0, 60).replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_");
}

function frDate(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function exportToWord(title: string, content: string): Promise<void> {
  const { Document, Paragraph, TextRun, HeadingLevel, Packer } = await import("docx");

  const date = frDate();

  const bodyParagraphs = content.split("\n").map((line) => {
    if (/^###\s/.test(line)) return new Paragraph({ text: line.replace(/^###\s/, ""), heading: HeadingLevel.HEADING_3 });
    if (/^##\s/.test(line)) return new Paragraph({ text: line.replace(/^##\s/, ""), heading: HeadingLevel.HEADING_2 });
    if (/^#\s/.test(line)) return new Paragraph({ text: line.replace(/^#\s/, ""), heading: HeadingLevel.HEADING_1 });
    if (line.trim() === "") return new Paragraph({ text: "" });
    return new Paragraph({ children: [new TextRun({ text: line })] });
  });

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 32 })] }),
        new Paragraph({ children: [new TextRun({ text: date, italics: true, color: "6B7280", size: 20 })] }),
        new Paragraph({ text: "" }),
        ...bodyParagraphs,
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slugify(title)}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportToPdf(title: string, content: string): Promise<void> {
  const { jsPDF } = await import("jspdf");

  const date = frDate();
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxW = pageW - margin * 2;
  let y = margin;

  const newPage = () => { doc.addPage(); y = margin; };
  const check = (need: number) => { if (y + need > pageH - margin) newPage(); };

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(45, 106, 79);
  const titleLines = doc.splitTextToSize(title, maxW) as string[];
  check(titleLines.length * 7 + 10);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 7 + 2;

  // Date
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(date, margin, y);
  y += 7;

  // Separator
  doc.setDrawColor(229, 224, 216);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // Body
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(26, 26, 26);

  for (const line of content.split("\n")) {
    if (line.trim() === "") { y += 3; continue; }
    if (/^#{1,3}\s/.test(line)) {
      check(9);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      const text = line.replace(/^#+\s/, "");
      const ls = doc.splitTextToSize(text, maxW) as string[];
      doc.text(ls, margin, y);
      y += ls.length * 6 + 2;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
    } else {
      const ls = doc.splitTextToSize(line, maxW) as string[];
      check(ls.length * 5.5 + 1);
      doc.text(ls, margin, y);
      y += ls.length * 5.5;
    }
  }

  doc.save(`${slugify(title)}.pdf`);
}
