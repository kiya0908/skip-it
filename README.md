# Skip It! 游戏站

这是一个基于 Next.js App Router 构建的现代化单页游戏站，专门用于展示和运行 **Skip It!** 网页游戏，并提供一系列精选的在线街机游戏集合。

## 项目预览

- **域名**: [https://skipit.top](https://skipit.top)
- **核心游戏**: Skip It! (跳绳挑战)
- **技术栈**: Next.js 14, React, TypeScript, Tailwind CSS

## 核心功能

- **响应式设计**: 完美适配桌面端和移动端，包含移动端专用的游戏控制浮窗。
- **SEO 优化**: 
  - 动态生成 `sitemap.xml` 和 `robots.txt`。
  - 每个页面都有独立的 Metadata 设置和 JSON-LD 结构化数据。
  - 针对核心关键词 "Skip It"、"Jump Game"、"Arcade Games" 进行内容优化。
- **性能卓越**:
  - 使用自定义优化组件进行图片和脚本的延迟加载。
  - 针对 AdSense 广告位进行了防抖和防错触处理。
  - 核心 LCP 资源（如游戏封面）预请求处理。
- **搜索与分类**: 支持全站游戏搜索以及基于 slug 的动态分页列表。

## 项目结构

项目采用 Next.js App Router 架构：

- `app/`: 路由与页面组件
    - `app/page.tsx`: 首页（核心游戏展示区）
    - `app/games/[slug]/page.tsx`: 动态游戏详情页
    - `app/search/`: 搜索结果页
    - `app/components/`: 可复用组件（Header, Footer, GameGrid, AdUnit 等）
- `data/games.json`: 核心数据源，维护所有游戏的 Slug、标题、SEO 信息及 iframe 链接。
- `public/`: 静态资源（图像、favicon, robots.txt 等）。

## 开发与运行

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **本地启动**:
   ```bash
   npm run dev
   ```

3. **生产构建**:
   ```bash
   npm run build
   ```

## 环境变量配置

在 `.env.local` 文件中配置以下变量以启用分析和广告：

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXX  # Google ADSENSE ID
NEXT_PUBLIC_ADSENSE_TOP_SLOT=    # 顶部广告位 ID
NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT= # 底部广告位 ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=   # Google Analytics ID (G-XXXXXXX)
```

## 部署

项目推荐部署于 **Cloudflare Pages** 或 **Vercel**。
推送代码到 GitHub 仓库后，连接相应的部署平台即可完成全自动 CI/CD 流程。

---

*本项目由 Doodle Baseball 模板改造而来，已清理所有原品牌残留。*
