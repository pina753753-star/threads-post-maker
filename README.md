# Codex はじめて投稿ネタメーカー

ぴなさん向けに制作した、Codex初心者・Codexに興味がある人へ向けたThreads投稿案を作る静的Webページです。
GitHub Pagesに置くだけで公開できます。

## ファイル構成

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    └── hero-codex-storybook.svg
```

## 使い方

1. `index.html` をブラウザで開きます。
2. 「投稿テーマ」「入れたい一言・キーワード」「文章の雰囲気」を選びます。
3. 「投稿案をつくる」を押すと、Threads向けの投稿案が表示されます。
4. 「文章をコピー」を押してThreadsへ貼り付け、必要に応じて体験談や最新情報を加えて調整してください。

## 差し替えポイント

### CTAリンク

`index.html` 内の以下の仮リンクを、公開したいURLに差し替えてください。

```html
<a class="primary-cta" href="#replace-cta-url">相談・導線リンクを入れる</a>
```

### 画像

ヒーロー画像は `images/hero-codex-storybook.svg` です。
同じファイル名で画像を置き換えると、HTMLを編集せずに差し替えられます。
別ファイル名にする場合は、`index.html` の `img src` と `alt` を変更してください。

## GitHub Pagesで公開する方法

1. このフォルダの内容をGitHubリポジトリにアップロードします。
2. GitHubのリポジトリ画面で **Settings** を開きます。
3. **Pages** を選択します。
4. **Build and deployment** の Source を **Deploy from a branch** にします。
5. Branch を `main`、フォルダを `/root` にして保存します。
6. 表示されたURLを開き、スマホ幅でも崩れていないか確認します。

## スマホ確認チェックリスト

- 幅430px以下で横スクロールが出ない
- ボタンと入力欄が指で押しやすい
- 文字が小さすぎない
- 目的がファーストビューで分かる
- CTAリンクを本番URLへ差し替え済み
- 画像の代替テキストが内容に合っている

## 補足

このページは外部ライブラリやサーバーを使っていません。
投稿案はブラウザ上のJavaScriptで生成されるため、GitHub Pagesなどの静的ホスティングでそのまま動きます。
