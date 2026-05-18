const form = document.querySelector('#promoForm');
const results = document.querySelector('#results');
const copyMessage = document.querySelector('#copyMessage');

const initialOutput = createOutputs(getFormValues());
renderOutputs(initialOutput);

function getFormValues() {
  const formData = new FormData(form);

  return {
    industry: safeText(formData.get('industry'), '小さなお店'),
    product: safeText(formData.get('product'), 'おすすめ商品'),
    target: safeText(formData.get('target'), 'はじめて利用するお客様'),
    pain: safeText(formData.get('pain'), 'どれを選べばいいか分からない'),
    benefit: safeText(formData.get('benefit'), '迷わず選べて、すぐ行動できる'),
    campaign: safeText(formData.get('campaign'), '期間限定キャンペーン'),
    price: safeText(formData.get('price'), '価格は店頭でご確認ください'),
    cta: safeText(formData.get('cta'), '詳しく見る'),
    tone: safeText(formData.get('tone'), '親しみやすい'),
    goal: safeText(formData.get('goal'), '問い合わせ')
  };
}

function safeText(value, fallback) {
  const text = String(value || '').trim();
  return text || fallback;
}

function createOutputs(values) {
  const hashtagIndustry = values.industry.replace(/[・\s]/g, '');
  const hashtagProduct = values.product.replace(/[・\s]/g, '');

  return [
    {
      title: 'Instagram投稿文',
      text: `【${values.industry}】\n\n「${values.pain}」と感じている方へ。\n\n${values.product}は、${values.target}に向けて、${values.benefit}を目指したメニューです。\n\n今なら、${values.campaign}。\n${values.price}\n\n気になる方は、まずは「${values.cta}」からどうぞ。\n\n#${hashtagIndustry} #${hashtagProduct} #キャンペーン`
    },
    {
      title: 'チラシ文面',
      text: `見出し：\n${values.pain}なら、${values.product}を試してみませんか？\n\nサブ見出し：\n${values.target}に向けた、${values.tone}な${values.industry}のご提案です。\n\n本文：\n${values.product}は、${values.benefit}を大切にしたサービスです。\n「気になっていたけど、まだ試せていない」という方にも分かりやすくご案内します。\n\nキャンペーン：\n${values.campaign}\n\n価格：\n${values.price}\n\n行動ボタン：\n${values.cta}`
    },
    {
      title: 'LINE配信用メッセージ',
      text: `${values.product}のお知らせです。\n\n${values.pain}と感じている方に向けて、${values.benefit}を目指した内容をご用意しました。\n\n${values.campaign}\n${values.price}\n\n気になる方は、こちらから${values.cta}。`
    },
    {
      title: 'LP構成',
      text: `1. ファーストビュー\n${values.pain}な方へ。${values.product}で、${values.benefit}へ。\nCTA：${values.cta}\n\n2. 共感パート\n${values.target}が感じやすい悩みを3つ並べる。\n\n3. 解決パート\n${values.product}がなぜその悩みに合うのかを説明。\n\n4. 信頼パート\nお客様の声、実績、写真、使用シーンを入れる。\n\n5. キャンペーンパート\n${values.campaign}\n${values.price}\n\n6. 最後のCTA\n迷っている方に向けて、軽い一押し。\n目的：${values.goal}`
    },
    {
      title: 'Canva見出し',
      text: `・${values.pain}なら、まずこれ。\n・${values.target}に選ばれています。\n・${values.product}で、${values.benefit}へ。\n・${values.campaign}\n・迷ったら、${values.cta}から。`
    }
  ];
}

function renderOutputs(outputs) {
  results.replaceChildren(...outputs.map(createResultBlock));
}

function createResultBlock(output, index) {
  const article = document.createElement('article');
  article.className = 'result-block';

  const header = document.createElement('div');
  header.className = 'result-block-header';

  const title = document.createElement('h3');
  title.className = 'result-title';
  title.textContent = output.title;

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'copy-button';
  copyButton.dataset.copyIndex = String(index);
  copyButton.textContent = 'コピー';

  const text = document.createElement('pre');
  text.className = 'result-text';
  text.textContent = output.text;

  article.dataset.outputText = output.text;
  header.append(title, copyButton);
  article.append(header, text);

  return article;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderOutputs(createOutputs(getFormValues()));
  copyMessage.textContent = '販促文を作りました。必要なところだけコピーして使えます。';
});

results.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-index]');

  if (!button) {
    return;
  }

  const block = button.closest('.result-block');
  const text = block?.dataset.outputText || '';

  try {
    await navigator.clipboard.writeText(text);
    copyMessage.textContent = 'コピーしました。';
  } catch {
    copyMessage.textContent = 'コピーできない場合は、文章を長押しして選択してください。';
  }
});
