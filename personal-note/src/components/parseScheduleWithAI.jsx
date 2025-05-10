export async function parseScheduleWithAI(noteText) {
  const OPENROUTER_API_KEY = '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';

  const today = new Date();
  const todayStr = today.toLocaleDateString('vi-VN');
  const prompt = `Hôm nay là ngày ${todayStr}. 
    Bạn là một trợ lý sắp xếp lịch trình. Hãy đọc văn bản dưới đây và liệt kê các lịch trình theo định dạng:
    "Ngày dd/mm/yyyy (Thứ ...)\n  - hoạt động 1\n  - hoạt động 2\n..."

    Văn bản: """${noteText}"""
    `;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-prover-v2:free",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  const rawOutput = data?.choices?.[0]?.message?.content || "";

  return parseAIOutput(rawOutput);
}

function parseAIOutput(rawText) {
  const lines = rawText.split("\n").map(line => line.trim()).filter(Boolean);
  const resultMap = new Map();
  let currentDate = null;

  for (let line of lines) {
    const dateMatch = line.match(/ngày\s+(\d{2})\/(\d{2})\/(\d{4})/i);
    if (dateMatch) {
      const [_, dd, mm, yyyy] = dateMatch;
      currentDate = new Date(`${yyyy}-${mm}-${dd}`);
    } else if (currentDate && !isNaN(currentDate)) {
      const content = line.replace(/^[-–•✈️🚕🛫👵👴🏡🛏️\s*]*/u, "").trim();
      if (content && !content.toLowerCase().startsWith("lưu ý") && !content.toLowerCase().startsWith("dựa trên")) {
        const key = currentDate.toISOString().split('T')[0];
        if (!resultMap.has(key)) {
          resultMap.set(key, { date: new Date(currentDate), content: [content] });
        } else {
          resultMap.get(key).content.push(content);
        }
      }
    }
  }

  return Array.from(resultMap.values());
}

