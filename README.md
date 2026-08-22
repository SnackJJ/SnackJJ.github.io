# portfolio-site

单页个人简历 / 作品集网站 — 浅色纸白 Flexoki 主题 + 轻像素点缀。
内容事实全部来自 `/mnt/d/dev/oppo-radar`（`profile.yaml`、`candidate/*.yaml`）。

## 运行 / 测试

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build（生产构建）
npm run preview    # 预览 dist/
```

辅助脚本（需要本机 Playwright Chromium 缓存）：

```bash
node scripts/screenshot.mjs   # 桌面全页 + 移动端首屏截图 → shots/
node scripts/verify.mjs       # 20 项 DOM / 样式断言（token、字体、交互、响应式）
```

## 技术栈

- Vite + React 19 + TypeScript
- Tailwind CSS v4（`@tailwindcss/vite`，语义 token 定义在 `src/index.css` 的 `@theme`）
- 自托管字体：Inter Variable / Silkscreen / JetBrains Mono Variable（Fontsource，离线可用）

## 设计 token（Flexoki light）

| Token | Hex | 用途 |
|---|---|---|
| `paper` | `#FFFCF0` | 页面底色 |
| `surface` | `#F2F0E5` | 卡片、导航栏 |
| `surface-2` | `#E6E4D9` | hover 填充、次级底色 |
| `line` | `#DAD8CE` | 边框、像素按钮硬偏移阴影 |
| `ink` | `#100F0F` | 主文字、主按钮底色 |
| `ink-2` | `#575653` | 副标题、段落描述 |
| `ink-3` | `#878580` | 弱化 meta（仅 ≥14px 非关键信息） |
| `accent` | `#24837B` | Cyan：眉标、图标、标签描边、列表符号 |
| `accent-deep` | `#1C6C66` | 正文级链接（hover 加深至 `accent-deepest #164F4A`） |
| `highlight` | `#AD8301` | Yellow：极小面积点睛 |
| `highlight-soft` | `#F1D67E` | 文本选区、荧光笔扫过效果 |
| `danger` | `#AF3029` | 表单校验错误（预留） |

原始 hex 只出现在两处：`src/index.css` 的 `@theme` 与 `src/data/pixelArt.ts`
的 sprite 调色板；页面代码一律使用语义类名。

## 结构

```
src/
  data/resume.ts        # 全部文案数据（真实信息 + TODO 标注）
  data/pixelArt.ts      # 像素 sprite 地图（机器人头像 / 星标 / 项目装饰图）
  hooks/                # （reveal 逻辑在 components/Reveal.tsx）
  components/
    Navbar.tsx          # 固定导航，滚动后加 Line 底边框；移动端汉堡菜单
    Hero.tsx            # Silkscreen 问候语 + 姓名 + 双像素按钮 + 像素头像
    PixelAvatar.tsx     # 16×16 box-shadow 像素机器人 + Yellow 星标
    About.tsx           # 简介 + 教育卡片 + 分组技术胶囊
    Experience.tsx      # 时间轴（腾讯 IEG 实习 / 独立项目）
    Projects.tsx        # Featured 大卡（像素装饰面板交替布局）+ 网格卡
    Contact.tsx         # 荧光笔扫过的大邮箱链接 + 像素社交图标
    Footer.tsx
    SectionHeading.tsx  # 编号眉标（Silkscreen）+ 小节容器
    Reveal.tsx          # IntersectionObserver 进场动画（尊重 reduced-motion）
    icons.tsx           # 16×16 手绘像素图标 + SVG 像素场景
```

## 像素风使用范围

仅以下几处（总占比 <10%）：Hero 像素机器人头像、"Hi, my name is" 与各区块
编号眉标两处 Silkscreen 微文案、直角+4px 硬偏移阴影的按钮、Hero/Footer 极淡
网格纹理（opacity 0.04）、16×16 线性像素图标、项目装饰性像素面板。

## 待补（TODO）

- `src/data/resume.ts`：各项目的 Live Demo 链接、简历 PDF 下载链接、部分课程
  项目仓库链接（均为 `null` + `TODO:` 注释，渲染时自动隐藏对应入口）。
- Featured 项目面板目前为程序化像素装饰图，可替换为真实截图（轻度像素化处理）。
