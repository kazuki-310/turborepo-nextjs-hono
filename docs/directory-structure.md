# ディレクトリ構成

このプロジェクトは Turborepo を使用したモノレポ構成になっています。

## プロジェクト概要

- **パッケージマネージャー**: pnpm
- **ビルドツール**: Turborepo
- **Node.js バージョン**: >= 18

## ディレクトリ構造

```
turborepo-nextjs-hono/
├── apps/                    # アプリケーション
│   ├── api/                # API アプリケーション (Hono)
│   │   ├── src/
│   │   │   └── index.ts    # API エントリーポイント
│   │   ├── wrangler.jsonc  # Cloudflare Workers 設定
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                # Web アプリケーション (Next.js)
│       ├── app/            # Next.js App Router
│       │   ├── layout.tsx  # ルートレイアウト
│       │   ├── page.tsx    # ホームページ
│       │   ├── globals.css # グローバルスタイル
│       │   └── fonts/      # フォントファイル
│       ├── components/     # React コンポーネント
│       │   └── ui/         # shadcn/ui コンポーネント
│       ├── hooks/          # カスタムフック
│       ├── lib/            # ユーティリティ関数
│       ├── public/         # 静的ファイル
│       ├── components.json # shadcn/ui 設定
│       ├── next.config.ts  # Next.js 設定
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                # 共有パッケージ
│   ├── db/                 # データベースパッケージ
│   │   ├── schemas/        # Drizzle スキーマ定義
│   │   │   ├── index.ts
│   │   │   └── pet.ts
│   │   ├── types/          # TypeScript 型定義
│   │   │   ├── index.ts
│   │   │   └── pet.ts
│   │   ├── zod/            # Zod スキーマ
│   │   │   ├── index.ts
│   │   │   └── pet.ts
│   │   ├── migrations/     # データベースマイグレーション
│   │   ├── drizzle.config.ts
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── eslint-config/      # 共有 ESLint 設定
│   │   ├── base.js         # ベース設定
│   │   ├── next.js         # Next.js 用設定
│   │   ├── react-internal.js
│   │   └── package.json
│   │
│   └── typescript-config/  # 共有 TypeScript 設定
│       ├── base.json       # ベース設定
│       ├── nextjs.json     # Next.js 用設定
│       ├── react-library.json
│       └── package.json
│
├── docs/                    # プロジェクトドキュメント
│   ├── directory-structure.md  # このファイル
│   └── coding-conventions.md   # コーディング規約
│
├── .vscode/                # VS Code 設定
├── node_modules/           # 依存パッケージ
├── .gitignore             # Git 除外設定
├── .npmrc                 # npm 設定
├── package.json           # ルート package.json
├── pnpm-lock.yaml         # pnpm ロックファイル
├── pnpm-workspace.yaml    # pnpm ワークスペース設定
├── turbo.json             # Turborepo 設定
└── README.md              # プロジェクト README
```

## アプリケーション詳細

### apps/api (Hono API)

Cloudflare Workers 上で動作する Hono フレームワークを使用した API アプリケーション。

- **フレームワーク**: Hono v4.10.1
- **デプロイ先**: Cloudflare Workers
- **開発コマンド**: `pnpm dev --filter=api`
- **デプロイコマンド**: `pnpm run deploy --filter=api`

### apps/web (Next.js Web)

Next.js 16 と React 19 を使用したフロントエンドアプリケーション。

- **フレームワーク**: Next.js 16.0.0
- **React バージョン**: React 19.2.0
- **UI ライブラリ**: shadcn/ui (Radix UI + Tailwind CSS)
- **スタイリング**: Tailwind CSS v4
- **フォーム管理**: React Hook Form + Zod
- **開発コマンド**: `pnpm dev --filter=web`
- **ビルドコマンド**: `pnpm build --filter=web`

## 共有パッケージ詳細

### @repo/db

Drizzle ORM を使用したデータベース管理パッケージ。

- **ORM**: Drizzle ORM
- **スキーマ**: `schemas/` ディレクトリで管理
- **型定義**: TypeScript と Zod の両方で提供
- **マイグレーション**: `migrations/` ディレクトリで管理

### @repo/eslint-config

プロジェクト全体で使用する ESLint 設定。

- `base.js`: ベース設定
- `next.js`: Next.js アプリケーション用
- `react-internal.js`: React ライブラリ用

### @repo/typescript-config

プロジェクト全体で使用する TypeScript 設定。

- `base.json`: ベース設定
- `nextjs.json`: Next.js プロジェクト用
- `react-library.json`: React ライブラリ用

## 開発コマンド

```bash
# すべてのアプリを開発モードで起動
pnpm dev

# 特定のアプリのみ起動
pnpm dev --filter=web
pnpm dev --filter=api

# すべてのアプリをビルド
pnpm turbo build

# リント
pnpm lint

# 型チェック
pnpm typecheck

# コードフォーマット
pnpm format
```

## ワークスペース管理

このプロジェクトは pnpm ワークスペースを使用しています。

- 各パッケージは独立して管理されますが、依存関係を共有できます
- `workspace:*` プロトコルでローカルパッケージを参照
- Turborepo がタスクのキャッシュと並列実行を管理

## 環境変数

- `.env.local`: ローカル環境変数（Git 管理外）
- `.env.example`: 環境変数のサンプル
- ビルド時に必要な環境変数は `turbo.json` の `env` フィールドで指定

## 注意事項

1. **パッケージの追加**: ワークスペース内のパッケージは `pnpm add` に `--filter` オプションを使用
2. **依存関係の共有**: ルートの `package.json` に共通の開発依存関係を配置
3. **ビルド順序**: Turborepo が自動的に依存関係を解析してビルド順序を決定
