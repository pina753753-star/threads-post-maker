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

const postPatterns = [
  {
    title: 'やさしい投稿',
    description: '最初の一歩をそっと後押し',
    prefix: '',
    ending: '同じように気になっている人は、小さな作業から試してみてください。'
  },
  {
    title: '共感投稿',
    description: '迷いや不安に寄り添う文章',
    prefix: '「Codexって便利そう。でも何から頼めばいいの？」と思ったことがある人へ。\n\n',
    ending: '最初から上手に使えなくても大丈夫。迷いながら触る時間も、ちゃんと次の投稿ネタになります。'
  },
  {
    title: '行動を促す投稿',
    description: '読んだ人が試しやすい締め',
    prefix: '今日の小さなおすすめです。\n\n',
    ending: 'まずは1つだけ、直したい文章や画面をCodexに渡してみてください。次の一歩が見えやすくなります。'
  }
];

let generatedPosts = [];

function buildPost(theme, keyword, tone, pattern = postPatterns[0]) {
  const selected = themeTemplates[theme];
  const keywordLine = keyword
    ? `\n\n今日の例：${keyword}\nこのくらい身近なテーマから始めると、投稿にも体験にも落とし込みやすいです。`
    : '';

  return `${pattern.prefix}${selected.hook}\n\n${selected.body}${keywordLine}\n\n${toneLines[tone]}\n\n${selected.close}\n\n${pattern.ending}\n\n#Codex #AI活用 #Threads投稿`;
}

function createPostCard(post, index) {
  const article = document.createElement('article');
  article.className = 'post-card';

  const header = document.createElement('div');
  header.className = 'post-card-header';

  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = index + 1;

  const headingWrap = document.createElement('div');

  const title = document.createElement('h3');
  title.textContent = post.title;

  const description = document.createElement('p');
  description.textContent = post.description;

  const body = document.createElement('p');
  body.className = 'post-body';
  body.textContent = post.text;

  const copyPatternButton = document.createElement('button');
  copyPatternButton.type = 'button';
  copyPatternButton.className = 'copy-pattern-button';
  copyPatternButton.dataset.copyIndex = String(index);
  copyPatternButton.textContent = `${post.title}をコピー`;

  headingWrap.append(title, description);
  header.append(avatar, headingWrap);
  article.append(header, body, copyPatternButton);

  return article;
}

function renderPosts(posts) {
  resultText.replaceChildren(...posts.map(createPostCard));
}

async function copyPost(index) {
  const post = generatedPosts[index];

  if (!post) {
    copyMessage.textContent = '先に投稿案を作ってください。';
    return;
  }

  try {
    await navigator.clipboard.writeText(post.text);
    copyMessage.textContent = `「${post.title}」をコピーしました。Threadsに貼り付けて調整できます。`;
  } catch {
    copyMessage.textContent = 'コピーできない場合は、文章を長押しして選択してください。';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const theme = formData.get('theme');
  const keyword = String(formData.get('keyword') || '').trim();
  const tone = formData.get('tone');

  generatedPosts = postPatterns.map((pattern) => ({
    title: pattern.title,
    description: pattern.description,
    text: buildPost(theme, keyword, tone, pattern)
  }));

  renderPosts(generatedPosts);
  copyMessage.textContent = '3つの投稿案を作りました。気分に合うものをコピーして使えます。';
});

copyButton.addEventListener('click', () => {
  copyPost(0);
});

resultText.addEventListener('click', (event) => {
  const button = event.target.closest('[data-copy-index]');

  if (!button) {
    return;
  }

  copyPost(Number(button.dataset.copyIndex));
});
