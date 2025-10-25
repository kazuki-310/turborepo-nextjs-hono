# コード規約

## 基本方針

- 可読性と保守性を重視
- 一貫性のあるコーディングスタイル
- TypeScript の型安全性を最大限活用

## ファイル・ディレクトリ構成

### 基本命名規則

- ファイル名: `kebab-case`
- フォルダ名: `kebab-case`
- コンポーネント名: `kebab-case`

### Next.js App Router 特有の命名規則

- **App Router ファイル**: Next.js の規約に従う
  - `page.tsx` - ページエントリー
  - `layout.tsx` - レイアウト
  - `not-found.tsx` - 404ページ
  - `loading.tsx` - ローディングページ
  - `error.tsx` - エラーページ

- **プライベートフォルダ**: `_` プレフィックスを使用
  - `_components/` - ページ固有コンポーネント
  - `_lib/` - ページ固有ライブラリ・ユーティリティ

- **ルートグループ**: `()` で囲む
  - `(auth)/` - 認証関連ページ

## TypeScript

### 型定義

- すべての関数・変数に適切な型を付与
- `any` の使用は避け、適切な型を定義
- 型定義は `type` を使用
- 型名: `PascalCase`

```tsx
// NG: `interface` を使用するのは避ける
interface User {
  id: string;
  name: string;
}

// Good: `type` を使用
type User = {
  id: string;
  name: string;
};
```

- 型名: `PascalCase`

## React

### コンポーネント

- 関数コンポーネントを使用
- Props 型を明確に定義
- デフォルトエクスポートを使用

#### コンポーネント名の命名規則

- **目的に沿った具体的な名前**を使用する
- Server Component / Client Component 問わず、コンポーネントの役割が明確になる名前にする
- 汎用的すぎる名前は避ける

```tsx
// NG: 役割が不明確
`client.tsx`;
`component.tsx`;

// Good: 目的が明確
`user-profile-form.tsx`;
`campaign-list.tsx`;
```

```typescript
type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  variant: 'primary' | 'secondary'
}

export default function Button({
  children,
  onClick,
  variant = 'primary'
}): JSX.Element {
  return (
    <button onClick={onClick} variant={variant}>
      {children}
    </button>
  )
}
```

### フック

- カスタムフックは `use` プレフィックス
- 適切な依存配列を指定

#### `useMemo` と `useCallback` の使用指針

**基本原則: 必要な場合のみ使用する**

- パフォーマンスの最適化は、問題が発生してから行う
- 何でもメモ化するのではなく、効果的な場面でのみ使用する
- まずはレンダーロジックを純粋に保つことを優先する

**参考資料:**

- [useCallback](https://ja.react.dev/reference/react/useCallback)
- [useMemo](https://ja.react.dev/reference/react/useMemo)
- [React Compiler](https://ja.react.dev/learn/react-compiler)
  - 将来的には React Compiler が自動的にメモ化を最適化してくれるため、手動でのメモ化の必要性は減る予定です。

## Next.js App Router

### Server Components と Client Components の使い分け

**基本原則**: デフォルトで Server Components を使用し、必要な場合のみ Client Components を使用する

#### Server Components を使用する場合

- **データフェッチ**: API からデータを取得する場合
- **バックエンドリソースへの直接アクセス**: データベースへの直接アクセスが必要な場合
- **サーバー上での処理**: 重い計算処理をサーバー側で行う場合

#### Client Components を使用する場合

- **インタラクティブな機能**: クリックイベント、フォーム送信などのユーザーインタラクション
- **状態管理**: `useState`, `useReducer` などの React フック使用
- **ブラウザ API**: `localStorage`, `sessionStorage`, `window` オブジェクトなどへのアクセス
- **イベントリスナー**: `addEventListener` などのイベント処理
- **リアルタイム更新**: WebSocket やポーリングによるリアルタイム更新

## React Hook Form

### フォーム状態の取得方法

パフォーマンス最適化のため、下記の順序で使用を検討する：

1. **getValues()** - 最も推奨（再レンダリングを発生させない）
2. **useWatch()** - 特定コンポーネントのみ再レンダリング
3. **watch()** - 最も非推奨（アプリ全体の再レンダリングを発生させる）

```tsx
// Good: 再レンダリングを発生させない
const handleSubmit = (data: FormData) => {
  const currentValues = getValues();
  console.log(currentValues);
};

// Better: 特定コンポーネントでのみ再レンダリング
const watchedValue = useWatch({
  control,
  name: "fieldName",
});

// NG: アプリ全体の再レンダリングを発生させる
const watchedValue = watch("fieldName");
```

### 使用指針

- **getValues()**: 値の取得のみが必要な場合
- **useWatch()**: 値の変更に応じて特定コンポーネントを更新したい場合
- **watch()**: 避ける（どうしても必要な場合のみ使用）

## 命名規則

### 変数・関数名

- キャメルケース（camelCase）を使う
- スネークケース（snake_case）かパスカルケース（PascalCase）を使うのは **NG**
- 不明確な関数名と変数名を避ける（output、console など）

### 定数名

- 大文字とアンダースコア（UPPER_SNAKE_CASE）を使う

```tsx
// Good
const ITEMS_PER_PAGE = 100;
```

- 用途を明確に示す名前にする

```tsx
// NG
const ms = 3000;

// Good
const DEFAULT_TIMEOUT_MS = 3000;
```

- 単数形（Singular）と複数形（Plural）を適切に使い分ける

```tsx
// NG
const SUPPORTED_LANGUAGE = ["en", "ja"];

// Good
const SUPPORTED_LANGUAGES = ["en", "ja"];
```

### イベントハンドラー名

- イベントハンドラー名はキャメルケース（camelCase）を使う
- `handle` と `on` プレフィックスの使い分けは下記のルールに従う
- 意図がわかりにくいプレフィックスを避ける

```tsx
// NG
const click = () => {...}
const propsClick = () => {...}

// Good
const handleClick = () => {...}
const onClick = () => {...}
```

#### `handle` プレフィックス

- 内部イベント処理
  - コンポーネントの内部でイベントを処理するための関数に `handle` を使う
- コンポーネント内部のロジック
  - そのコンポーネントの中で、クリックやフォームの送信などのイベントが発生した時に何らかの処理を行う関数に対して使う

```tsx
export default function ParentComponent() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

#### `on` プレフィックス

- 外部からの `props` として受け取る関数
  - 親コンポーネントから渡されるイベントハンドラーやコールバック関数に対して `on` を使う
- `props` 名としてのコールバック
  - コンポーネントの使用者がイベントを受け取るために外部から関数を渡す時に使う

```tsx
// @/components/ParentComponent
export default function ParentComponent() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <ChildComponent onClick={handleClick} />;
}

// @/components/ChildComponent
export default function ChildComponent({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click me</button>;
}
```

## コーディングスタイル

### `const` と `let` の使い分け

- 原則として `const` を使う
- 値を変更せざるを得ない場合のみ `let` を使う
- `var` を使うのは **NG**

```tsx
// NG
let message;

if (isLoggedIn) {
  message = "こんにちは!";
} else {
  message = "ログインしてください！";
}

// Good
const message = isLoggedIn ? "こんにちは!" : "ログインしてください！";
```

#### `let` を使っても良い例

- ループ内で値を変更する場合

```tsx
let count = 0;

for (let i = 0; i < 10; i++) {
  count += i;
}
```

- 再代入が必要な場合

```tsx
let result = 0;

function add(value: number) {
  result += value;
}

add(10);
```

### 分割代入

- オブジェクトからデータを抽出する時に基本的に分割代入を使う
- 重複名前の場合、エイリアスを使う

#### ベーシック

```tsx
const user = {
  id: 1
  name: "Taro Yamada"
}

// NG
console.log(user.id);
console.log(user.name);

// Good
const { id, name } = user;
```

#### ネスト

```tsx
const data = {
  user: {
    id: 1,
    name: "Taro Yamada",
    address: {
      city: "Tokyo",
    },
  },
};

// NG
console.log(data.user.id);
console.log(data.user.name);
console.log(data.user.address.city);

// NG
const {
  user: {
    address: { city },
  },
} = data;

// Good
const { user } = data;
const { id, name, address } = user;
const { city } = address;
```

## コメントとドキュメンテーション

- コードの意図が明確の場合、コメントは基本的に不要
  - 過多なコメントを避ける
- コメントの種類によって下記のアノテーションコメントを使う

### アノテーションコメント

- コード内で特定の要素に関する追加情報を提供するために使用されるコメント
- 「タグ + コロン」のフォーマットでコメントをつける
  - 例：`// TODO: この関数をリファクタリングする`

| **タグ**   | **説明**                                                             |
| ---------- | -------------------------------------------------------------------- |
| `TODO`     | あとで作業するべきこと（実装、修正）                                 |
| `NOTE`     | 重要な情報やコードの説明など                                         |
| `FIXME`    | 不具合のあるコード、修正が必要                                       |
| `OPTIMIZE` | パフォーマンス向上のため、ロジックの改善やリファクタリングなどが必要 |
| `WARNING`  | 注意が必要で、慎重に修正しなければならないコード                     |

### JSDoc 形式のコメント

- コードを更に明確にするために JSDoc を使う
- 一般的なユースケース：
  - ライブラリやフレームワークの API 文書
  - 複数のパラメータを持つ複雑な関数
- 各タグは「[JSDoc リファレンス](https://www.typescriptlang.org/ja/docs/handbook/jsdoc-supported-types.html)」を参考する

```tsx
/**
 * 加算
 * @param {number} x - 1つ目の入力数値
 * @param {number} y - 2つ目の入力数値
 * @returns {number} - x と y の合計値
 */
function add(x: number, y: number) {
  return x + y;
}

/**
 * @deprecated この関数は非推奨で、代わりに `newMultiply` を使ってください
 * @param {number} x - 入力数値
 * @returns {number} - 入力数値を 2 倍にしたもの
 */
function oldMultiply(x) {
  return x * 2;
}

/**
 * 新しい乗法
 * @param {number} x - 入力数値
 * @returns {number} - 入力数値を 2 倍にしたもの
 */
function newMultiply(x) {
  return x * 2;
}
```

## コードレビュー観点

### パフォーマンス

- **レンダリング**
  - 初回レンダリングの速度が遅くなってないか
  - 不要な再レンダリングが発生していないか

### API 呼び出し

- サーバーからのエラーステータスに対して、エラーハンドリングが適切に行われているか
- API 呼び出し中に適切なローディングインジケーター（スピナー等）が表示されているか
- ボタン等の連打対策がされており、同一の API が連続で呼び出されないように制御しているか
- フォームの入力値に対するバリデーションが適切に設定されているか
- データが必要に応じて再フェッチされているか

### セキュリティ

- 秘匿情報が環境変数で管理されているか
- センシティブなデータが適切に扱われているか

### メンテナビリティ

- マジックナンバーを使用していないか
- `any` 型の多用を避けているか
- コンポーネントが適切に分割されているか
- コンポーネントが再利用可能な形で設計されているか
- フォルダ構成とコードの整理が適切で、プロジェクト全体が見通しやすくなっているか
