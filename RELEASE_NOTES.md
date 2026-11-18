<!--
Release note writing rules:
1. Always add the newest release at the top of this file; do not delete older release notes.
2. Move previous releases down unchanged, then write the new release above them.
3. Use this exact release structure:
   - One H1 title: "# vX.Y.Z - Short English Summary".
   - English section first with "### Added", "### Improved", and "### Fixed".
   - Then a horizontal rule "---".
   - Chinese section second with "### 新增", "### 改进", and "### 修复".
4. Use numbered items under each group. Each item must be:
   - "1. **Short feature/fix title.** One concise paragraph explaining what changed and why it matters."
   - No one-line commit dumps, no raw changelog lists, no vague marketing copy.
   - Merge related commits into one readable item instead of listing every commit separately.
5. Keep the tone user-friendly and concrete:
   - Explain behavior, compatibility, UI impact, migration impact, or bug impact in plain language.
   - Be concise but specific; one item is usually 1-3 sentences.
   - Avoid internal-only implementation details unless they explain a user-visible change.
6. Add GitHub commit links at the end of every numbered item:
   - English: "Commit: [abc1234](...)." or "Commits: [abc1234](...), [def5678](...)."
   - Chinese: "提交：[abc1234](...)。" or "提交：[abc1234](...)、[def5678](...)。"
7. The English and Chinese versions should match in content and ordering, not be two different summaries.
-->

# v1.0.2 - Sharp Edges, Visible Keyboard Focus, and Design Polish

### Added

1. **Sharp-edged interface.** Cards, panels, dialogs, menus, buttons, inputs, badges, toggles and focus outlines now all have square corners, giving the black-and-white Web Vault a crisper, more deliberate look. The ModWarden logo keeps its own shape. Commit: [290afa2](https://github.com/AlphaRomeoMike/modwarden/commit/290afa2b5a1be576158bca0bb8fada2f77ad094b).

### Improved

1. **Design polish from a Hallmark review.** Every gray in the Web Vault now comes from one shared set of tokens, sidebar headings and the "or" divider use normal sentence case instead of capitals, animations respect the system's reduce-motion setting, and checkboxes follow the black-and-white theme instead of the browser's blue. Commit: [bbf0a53](https://github.com/AlphaRomeoMike/modwarden/commit/bbf0a531cd199048df2c5a4e05d75b8371291433).

### Fixed

1. **Keyboard focus is visible on every control.** Buttons showed no focus ring because their shadow covered it, so keyboard users could lose track of where they were. Every control now shows a clear outline when focused from the keyboard. Commit: [bbf0a53](https://github.com/AlphaRomeoMike/modwarden/commit/bbf0a531cd199048df2c5a4e05d75b8371291433).

---

### 新增

1. **直角界面。** 卡片、面板、对话框、菜单、按钮、输入框、徽章、开关和焦点轮廓现在全部采用直角，让黑白网页密码库看起来更利落、更有设计感。ModWarden 标志保留原有形状。提交：[290afa2](https://github.com/AlphaRomeoMike/modwarden/commit/290afa2b5a1be576158bca0bb8fada2f77ad094b)。

### 改进

1. **基于 Hallmark 审查的设计打磨。** 网页密码库中的所有灰色现在都来自同一组设计令牌，侧边栏标题和"或"分隔符改用正常的首字母大写而不是全大写，动画遵循系统的"减少动态效果"设置，复选框也跟随黑白主题，而不是浏览器默认的蓝色。提交：[bbf0a53](https://github.com/AlphaRomeoMike/modwarden/commit/bbf0a531cd199048df2c5a4e05d75b8371291433)。

### 修复

1. **所有控件的键盘焦点都清晰可见。** 此前按钮的阴影遮住了焦点环，使用键盘的用户可能找不到当前位置。现在通过键盘聚焦时，每个控件都会显示清晰的轮廓。提交：[bbf0a53](https://github.com/AlphaRomeoMike/modwarden/commit/bbf0a531cd199048df2c5a4e05d75b8371291433)。

# v1.0.1 - Vault Database Moved to Asia-Pacific

### Improved

1. **Vault database moved to Asia-Pacific.** The D1 database now runs in the APAC region instead of western North America, so vault requests from Asia no longer cross the Pacific for every query. The previous database held no accounts or vault data, so nothing needs migrating. Commit: [d3be1a4](https://github.com/AlphaRomeoMike/modwarden/commit/d3be1a4e6336b0c65e921ee6a8d869908635d3b4).

### Fixed

1. **Deploys always use the production database.** The deploy configuration now names the database by its ID. Before, a deploy that could not find the live Worker's database would create a new, empty one and connect the vault to it, which would look like data loss. Commit: [d3be1a4](https://github.com/AlphaRomeoMike/modwarden/commit/d3be1a4e6336b0c65e921ee6a8d869908635d3b4).

---

### 改进

1. **密码库数据库迁移到亚太地区。** D1 数据库现在运行在亚太（APAC）区域，而不是北美西部，因此来自亚洲的密码库请求不再为每次查询跨越太平洋。之前的数据库中没有账户或密码库数据，因此无需迁移。提交：[d3be1a4](https://github.com/AlphaRomeoMike/modwarden/commit/d3be1a4e6336b0c65e921ee6a8d869908635d3b4)。

### 修复

1. **部署始终使用生产数据库。** 部署配置现在通过 ID 指定数据库。此前，如果部署找不到线上 Worker 正在使用的数据库，会创建一个新的空数据库并将密码库连接到它，看起来就像数据丢失。提交：[d3be1a4](https://github.com/AlphaRomeoMike/modwarden/commit/d3be1a4e6336b0c65e921ee6a8d869908635d3b4)。

# v1.0.0 - ModWarden Rebrand, Tag-Based Deploys, and Security Hardening

### Added

1. **ModWarden branding.** The Web Vault now uses the ModWarden name, a new half-gear/half-shield logo and app icons, and a black-and-white theme with inverse, elevated buttons; site and card logos keep their colours. Item icons also fall back to the next link that has a favicon. Commits: [b01419c](https://github.com/AlphaRomeoMike/modwarden/commit/b01419c2cac989d15d495dc036eb776e7262fd17), [7c78f8c](https://github.com/AlphaRomeoMike/modwarden/commit/7c78f8cbe014e147167aca8d67635c3c81f94d62), [db9f52b](https://github.com/AlphaRomeoMike/modwarden/commit/db9f52b9fa161bff3594eef26d0a67c104d23fb8).

1. **Production deploys from version tags.** Pushing a `v*` tag deploys that version to Cloudflare in KV storage mode through the `production` environment, and a manual run is only accepted for a tag, so untagged code never reaches production. Commits: [b3a4a76](https://github.com/AlphaRomeoMike/modwarden/commit/b3a4a766d9bd964e6093f2bea3122cddbe6d0d2a), [81df20e](https://github.com/AlphaRomeoMike/modwarden/commit/81df20e2666ddb47054bb640094afb350eeb5e6a).

### Improved

1. **Checks on every pull request.** CI builds the Web Vault, type-checks, runs every test suite and bundles the Worker before changes merge. Dependabot waits 7 days before proposing a new release, workflows grant write permissions per job only, and SECURITY.md points to this repository's private vulnerability reporting. Commits: [a492fae](https://github.com/AlphaRomeoMike/modwarden/commit/a492faea2db070acf615e160525d2cd0eecd6ea6), [c4b54ae](https://github.com/AlphaRomeoMike/modwarden/commit/c4b54aec37c7f567902d55295134c3a565070e47).

1. **Updated dependencies.** Preact moves to 11.2.0, @simplewebauthn/server to 14.1.0 and TypeScript to 7.0.2, along with minor and patch updates to TanStack Query, zip.js, Lucide icons, Tailwind CSS and Cloudflare Workers types. Commits: [2ec51e9](https://github.com/AlphaRomeoMike/modwarden/commit/2ec51e9dde888ad90dd911e6f182c1e387b36f2d), [38abea9](https://github.com/AlphaRomeoMike/modwarden/commit/38abea91bf6723e12076358f61d8f72e11205d4d), [67846a2](https://github.com/AlphaRomeoMike/modwarden/commit/67846a2aef5de8d4a4e76c634041eeb0b8063409), [ebebc6b](https://github.com/AlphaRomeoMike/modwarden/commit/ebebc6ba067d2115b9de22130a22c6930c6cd34b).

### Fixed

1. **No CPU spikes from long runs of repeated characters.** Trimming trailing slashes, equals signs and similar characters from passkey login fields, request paths and icon hosts now takes linear time. Previously a single crafted request could spend seconds of Worker CPU. Commit: [40d2ef6](https://github.com/AlphaRomeoMike/modwarden/commit/40d2ef6b5231c3f53f5576a71ad0ec0bea6be91c).

1. **Export dialog stays open after a failed export.** The master-password dialog now closes only when the export succeeds, so you can retry without starting over. Commit: [8a939f7](https://github.com/AlphaRomeoMike/modwarden/commit/8a939f7f19026500f72c9df20ba6d77e141f5b4b).

---

### 新增

1. **ModWarden 品牌。** 网页密码库改用 ModWarden 名称、新的半齿轮半盾牌标志和应用图标，以及黑白主题和反色、带阴影的按钮；网站和卡片标志保留原有颜色。项目图标也会回退到下一个带有网站图标的链接。提交：[b01419c](https://github.com/AlphaRomeoMike/modwarden/commit/b01419c2cac989d15d495dc036eb776e7262fd17)、[7c78f8c](https://github.com/AlphaRomeoMike/modwarden/commit/7c78f8cbe014e147167aca8d67635c3c81f94d62)、[db9f52b](https://github.com/AlphaRomeoMike/modwarden/commit/db9f52b9fa161bff3594eef26d0a67c104d23fb8)。

1. **通过版本标签部署生产环境。** 推送 `v*` 标签会通过 `production` 环境以 KV 存储模式将该版本部署到 Cloudflare；手动运行也只接受标签，因此未打标签的代码不会进入生产环境。提交：[b3a4a76](https://github.com/AlphaRomeoMike/modwarden/commit/b3a4a766d9bd964e6093f2bea3122cddbe6d0d2a)、[81df20e](https://github.com/AlphaRomeoMike/modwarden/commit/81df20e2666ddb47054bb640094afb350eeb5e6a)。

### 改进

1. **每个拉取请求都会检查。** 合并前，CI 会构建网页密码库、进行类型检查、运行所有测试并打包 Worker。Dependabot 会在新版本发布 7 天后才提出更新，工作流只为单个任务授予写入权限，SECURITY.md 指向本仓库的私密漏洞报告。提交：[a492fae](https://github.com/AlphaRomeoMike/modwarden/commit/a492faea2db070acf615e160525d2cd0eecd6ea6)、[c4b54ae](https://github.com/AlphaRomeoMike/modwarden/commit/c4b54aec37c7f567902d55295134c3a565070e47)。

1. **依赖更新。** Preact 升级到 11.2.0，@simplewebauthn/server 升级到 14.1.0，TypeScript 升级到 7.0.2，同时对 TanStack Query、zip.js、Lucide 图标、Tailwind CSS 和 Cloudflare Workers 类型进行了小版本和补丁更新。提交：[2ec51e9](https://github.com/AlphaRomeoMike/modwarden/commit/2ec51e9dde888ad90dd911e6f182c1e387b36f2d)、[38abea9](https://github.com/AlphaRomeoMike/modwarden/commit/38abea91bf6723e12076358f61d8f72e11205d4d)、[67846a2](https://github.com/AlphaRomeoMike/modwarden/commit/67846a2aef5de8d4a4e76c634041eeb0b8063409)、[ebebc6b](https://github.com/AlphaRomeoMike/modwarden/commit/ebebc6ba067d2115b9de22130a22c6930c6cd34b)。

### 修复

1. **大量重复字符不再导致 CPU 飙升。** 从通行密钥登录字段、请求路径和图标主机中去除末尾斜杠、等号等字符的操作现在为线性时间。此前，一个精心构造的请求可能消耗数秒的 Worker CPU。提交：[40d2ef6](https://github.com/AlphaRomeoMike/modwarden/commit/40d2ef6b5231c3f53f5576a71ad0ec0bea6be91c)。

1. **导出失败后导出对话框保持打开。** 主密码对话框现在只在导出成功后关闭，因此无需重新开始即可重试。提交：[8a939f7](https://github.com/AlphaRomeoMike/modwarden/commit/8a939f7f19026500f72c9df20ba6d77e141f5b4b)。
