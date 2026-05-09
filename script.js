const form = document.querySelector('#postForm');
const resultText = document.querySelector('#resultText');
const copyButton = document.querySelector('#copyButton');
const copyMessage = document.querySelector('#copyMessage');

const themeTemplates = {
  firstStep: {
    hook: 'Codex、気になるけど最初の一歩で止まっている人へ。',
    body: 'いきなり大きな開発を任せなくても大丈夫。まずは「文章を整える」「READMEを分かりやすくする」「小さな修正案を出してもらう」くらいから試すと、できることの感覚がつかみやすいです。',
    close: '最初は小さく、慣れたら少しずつ。これだけでハードルがぐっと下がります。'
  },
  benefit: {
    hook: 'Codexを使って助かるのは、作業を丸投げできることだけではありません。',
    body: '考えを整理したり、修正のたたき台を作ったり、次に何を確認すればいいかを言語化したり。手が止まりやすい場面で、横に相談相手がいるように進めやすくなります。',
    close: '「ひとりで悩む時間」を少し短くしたい人に、まず試してほしいです。'
  },
  tips: {
    hook: 'Codexを使うときは、お願いを小さく分けると迷いにくいです。',
    body: 'たとえば「この画面をいい感じにして」よりも、「スマホで読みやすい余白にして」「ボタンを押しやすくして」のように伝えると、確認もしやすくなります。',
    close: '初心者ほど、1回で完璧を目指さず、少しずつ一緒に整えるのがおすすめです。'
  },
  story: {
    hook: '最初はCodexに何を頼めばいいか、私も少し迷いました。',
    body: 'でも、小さな修正や文章づくりから試してみると、「こう頼めば進むんだ」が見えてきます。完璧な指示より、まず触ってみることが大事でした。',
    close: 'これから始める人は、身近な作業をひとつ選んで試してみてください。'
  }
};

const toneLines = {
  gentle: '焦らなくて大丈夫。できるところから一緒に進めていきましょう。',
  friendly: 'まずは気軽に、ひとつだけ頼んでみるのがちょうどいいです。',
  clear: 'ポイントは、目的・直したい場所・希望の雰囲気を短く伝えることです。'
};

function buildPost(theme, keyword, tone) {
  const selected = themeTemplates[theme];
  const keywordLine = keyword
    ? `\n\n今日の例：${keyword}\nこのくらい身近なテーマから始めると、投稿にも体験にも落とし込みやすいです。`
    : '';

  return `${selected.hook}\n\n${selected.body}${keywordLine}\n\n${toneLines[tone]}\n\n${selected.close}\n\n#Codex #AI活用 #Threads投稿`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const theme = formData.get('theme');
  const keyword = String(formData.get('keyword') || '').trim();
  const tone = formData.get('tone');

  resultText.textContent = buildPost(theme, keyword, tone);
  copyMessage.textContent = '投稿案を作りました。必要に応じて体験談を足してください。';
});

copyButton.addEventListener('click', async () => {
  const text = resultText.textContent.trim();
  if (!text || text.startsWith('テーマを選んで')) {
    copyMessage.textContent = '先に投稿案を作ってください。';
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyMessage.textContent = 'コピーしました。Threadsに貼り付けて調整できます。';
  } catch {
    copyMessage.textContent = 'コピーできない場合は、文章を長押しして選択してください。';
  }
});
